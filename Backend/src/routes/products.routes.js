import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/products.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { imageUpload } from '../middlewares/upload.js';
import { validate } from '../middlewares/validate.js';
import { idParam, productBody } from '../validators/product.validators.js';

const router = Router();

router.get('/', getProducts);
// Validamos el ID antes de buscar en la base
router.get('/:id', idParam, validate, getProduct);

// Orden: Autenticar -> Subir Temp -> Validar Textos -> Revisar Errores -> Ejecutar Controlador
router.post('/', verificarToken, imageUpload, productBody, validate, createProduct);
router.put('/:id', verificarToken, imageUpload, idParam, productBody, validate, updateProduct);
router.delete('/:id', verificarToken, idParam, validate, deleteProduct);

export default router;