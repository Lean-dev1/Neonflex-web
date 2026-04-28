import { pool } from '../config/db.js'; 
import { uploadImage, deleteImage } from '../config/cloudinary.js';
import fs from 'fs';

// Obtener todos los productos 
export const getProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener un solo producto
export const getProduct = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear producto
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    let image_url = null;
    let public_id = null;

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      image_url = result.secure_url;
      public_id = result.public_id;
      
      await fs.promises.unlink(req.files.image.tempFilePath);
    }

    const result = await pool.query(
      'INSERT INTO products (title, description, price, category, image_url, public_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, price, category, image_url, public_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, category } = req.body;

  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Producto no encontrado" });

    const currentProduct = result.rows[0];
    let new_image_url = currentProduct.image_url;
    let new_public_id = currentProduct.public_id;

    if (req.files?.image) {
      if (currentProduct.public_id) {
        await deleteImage(currentProduct.public_id);
      }
      const uploadResult = await uploadImage(req.files.image.tempFilePath);
      new_image_url = uploadResult.secure_url;
      new_public_id = uploadResult.public_id;
      
      await fs.promises.unlink(req.files.image.tempFilePath);
    }

    const updateQuery = `
      UPDATE products 
      SET title = $1, description = $2, price = $3, category = $4, image_url = $5, public_id = $6
      WHERE id = $7 RETURNING *
    `;
    const updated = await pool.query(updateQuery, [title, description, price, category, new_image_url, new_public_id, id]);

    res.json(updated.rows[0]);
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: error.message });
  }
};

// Borrar producto
export const deleteProduct = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    
    if (result.rows[0].public_id) {
      await deleteImage(result.rows[0].public_id);
    }
    
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};