import { body, param } from 'express-validator';

// Valida que el ID en la URL sea un número entero positivo
export const idParam = param('id').isInt({ min: 1, max: 2147483647 });

// Valida los campos del formulario
export const productBody = [
  body('title').isString().trim().isLength({ min: 1, max: 255 }).withMessage('El título es obligatorio y debe tener menos de 255 caracteres.'),
  body('description').optional({ checkFalsy: true }).isString().trim().isLength({ max: 5000 }),
  body('price').isFloat({ min: 0, max: 99999999.99 }).toFloat().withMessage('El precio debe ser un número positivo.'),
  body('category').isIn(['carteleria', 'impresion3d', 'insumos']).withMessage('Categoría inválida.'),
];