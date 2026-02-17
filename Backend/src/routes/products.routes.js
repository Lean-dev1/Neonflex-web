const { Router } = require('express');
const multer = require('multer');
const { getProducts, createProduct, deleteProduct } = require('../controllers/products.controller');

const router = Router();

// Configuración de Multer 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Definir rutas
router.get('/', getProducts);
router.post('/', upload.single('image'), createProduct); // 'image' es el name del input en el frontend
router.delete('/:id', deleteProduct);

module.exports = router;