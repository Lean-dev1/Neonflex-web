import { body, param } from 'express-validator';

// Agregamos la validación del ID que te faltaba
export const idParam = param('id').isInt().withMessage('El ID debe ser un número entero');

export const productBody = [
  body('title').isString().trim().isLength({ min: 1, max: 255 }).withMessage('El título es obligatorio.'),
  body('description').optional({ checkFalsy: true }).isString().trim().isLength({ max: 5000 }),
  body('price').isFloat({ min: 0, max: 99999999.99 }).toFloat().withMessage('Precio inválido.'),
  body('category').isIn(['frases', 'negocios', 'figuras']).withMessage('Categoría inválida. Debe ser frases, negocios o figuras.'),
  body('medidas').optional({ checkFalsy: true }).isString().trim().isLength({ max: 50 }),
];