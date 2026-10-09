import { pool } from '../config/db.js';
import { uploadImage, deleteImage } from '../config/cloudinary.js';
import { removeTempFiles } from '../utils/files.js';

// public_id es un dato interno: no se expone en los endpoints por seguridad
const PUBLIC_COLUMNS = 'id, title, description, price, category, image_url, created_at';

// Helper para evitar que un error al borrar en Cloudinary crashee toda la petición
const discardImage = (publicId) =>
  deleteImage(publicId).catch((e) => console.error('Imagen huérfana en Cloudinary:', publicId, e.message));

export const getProducts = async (req, res, next) => {
  try {
    const limit = Math.min(Number.parseInt(req.query.limit, 10) || 100, 100);
    const offset = Math.max(Number.parseInt(req.query.offset, 10) || 0, 0);
    const { rows } = await pool.query(
      `SELECT ${PUBLIC_COLUMNS} FROM products ORDER BY created_at DESC, id DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    res.json(rows);
  } catch (error) {
    next(error); // Delega el error al manejador global de index.js
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { rows } = await pool.query(`SELECT ${PUBLIC_COLUMNS} FROM products WHERE id = $1`, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado.' });
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  let uploaded = null;
  try {
    const { title, description, price, category } = req.body;
    const file = req.files?.image;
    
    // Mantenemos nuestra validación estricta: la foto es obligatoria
    if (!file) return res.status(400).json({ message: "La imagen del producto es obligatoria." });

    uploaded = await uploadImage(file.tempFilePath);

    const { rows } = await pool.query(
      `INSERT INTO products (title, description, price, category, image_url, public_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING ${PUBLIC_COLUMNS}`,
      [title, description ?? null, price, category, uploaded.secure_url, uploaded.public_id]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    // Si la DB falla (ej. faltó la categoría), borramos la imagen que recién subimos
    if (uploaded) await discardImage(uploaded.public_id);  
    next(error);
  } finally {
    await removeTempFiles(req.files);
  }
};

export const updateProduct = async (req, res, next) => {
  let uploaded = null;
  try {
    const { id } = req.params;
    const { title, description, price, category } = req.body;

    const current = await pool.query('SELECT public_id FROM products WHERE id = $1', [id]);
    if (current.rowCount === 0) return res.status(404).json({ message: 'Producto no encontrado.' });

    const file = req.files?.image;
    if (file) uploaded = await uploadImage(file.tempFilePath);   // 1) subir la nueva

    const { rows } = await pool.query(                           // 2) actualizar la DB
      `UPDATE products
          SET title = $1, description = $2, price = $3, category = $4,
              image_url = COALESCE($5, image_url), public_id = COALESCE($6, public_id)
        WHERE id = $7
        RETURNING ${PUBLIC_COLUMNS}`,
      [title, description ?? null, price, category, uploaded?.secure_url ?? null, uploaded?.public_id ?? null, id]
    );

    if (uploaded && current.rows[0].public_id) {                 // 3) recién ahora borrar la vieja
      await discardImage(current.rows[0].public_id);
    }
    res.json(rows[0]);
  } catch (error) {
    if (uploaded) await discardImage(uploaded.public_id);
    next(error);
  } finally {
    await removeTempFiles(req.files);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { rows } = await pool.query('DELETE FROM products WHERE id = $1 RETURNING public_id', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado.' });

    if (rows[0].public_id) await discardImage(rows[0].public_id);  
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};