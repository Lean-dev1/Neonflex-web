const pool = require('../config/db');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// Función auxiliar para subir a Cloudinary usando Stream (Memoria)
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "cisneros_products" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// 1. OBTENER TODOS LOS PRODUCTOS
const getProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. CREAR PRODUCTO (CON IMAGEN)
const createProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    
    // Validar que venga una imagen
    if (!req.file) {
      return res.status(400).json({ message: "La imagen es obligatoria" });
    }

    // Subir imagen a Cloudinary
    const resultCloudinary = await uploadToCloudinary(req.file.buffer);

    // Guardar datos en PostgreSQL
    const query = `
      INSERT INTO products (title, description, price, category, image_url, public_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const values = [
      title, 
      description, 
      price, 
      category, 
      resultCloudinary.secure_url, // URL segura (https)
      resultCloudinary.public_id   // ID para borrarla luego
    ];

    const resultDB = await pool.query(query, values);
    
    res.status(201).json(resultDB.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

// ELIMINAR PRODUCTO
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Primero buscamos el producto para obtener el public_id de la imagen
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (product.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Borramos la imagen de Cloudinary
    if (product.rows[0].public_id) {
      await cloudinary.uploader.destroy(product.rows[0].public_id);
    }

    // Borramos de la base de datos
    await pool.query('DELETE FROM products WHERE id = $1', [id]);

    res.json({ message: "Producto eliminado correctamente" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProducts, createProduct, deleteProduct };