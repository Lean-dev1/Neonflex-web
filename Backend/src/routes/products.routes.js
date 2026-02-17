import { Router } from 'express';
import { 
    createProduct, 
    deleteProduct, 
    getProduct, 
    getProducts, 
    updateProduct 
} from '../controllers/products.controller.js';

const router = Router();

// Como en index.js ya dijimos que estas rutas empiezan con "/api/products",
// aquí solo ponemos "/" para referirnos a la raíz de esa sección.

router.get('/', getProducts);          // GET /api/products
router.get('/:id', getProduct);        // GET /api/products/123
router.post('/', createProduct);       // POST /api/products
router.put('/:id', updateProduct);     // PUT /api/products/123
router.delete('/:id', deleteProduct);  // DELETE /api/products/123

export default router;