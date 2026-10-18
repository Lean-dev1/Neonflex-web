import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/products.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js'; // Nota: Si habías cambiado este nombre a 'verifyToken' en el paso anterior, actualizalo acá.
import { imageUpload } from '../middlewares/upload.js';
import { validate } from '../middlewares/validate.js';
import { productBody, idParam } from '../validators/product.validators.js'; // Importación corregida y completa
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(getProducts));
router.get('/:id', idParam, validate, asyncHandler(getProduct));
router.delete('/:id', verificarToken, idParam, validate, asyncHandler(deleteProduct));

router.post('/', verificarToken, imageUpload, productBody, validate, createProduct);
router.put('/:id', verificarToken, imageUpload, idParam, productBody, validate, updateProduct);

export default router;