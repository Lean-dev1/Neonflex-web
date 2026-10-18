import { body } from 'express-validator';

export const cotizacionValidators = [
  body('nombre').isString().trim().isLength({ min: 1, max: 100 }),
  body('email').isEmail().isLength({ max: 254 }).normalizeEmail(),
  body('telefono').isString().trim().matches(/^[0-9+()\s-]{6,30}$/),
  body('projectType').isString().trim().isLength({ min: 1, max: 50 }),
  body('estilo').optional({ checkFalsy: true }).isString().trim().isLength({ max: 50 }),
  body('ideaText').isString().trim().isLength({ min: 1, max: 2000 }),
  body('colores').optional({ checkFalsy: true }).isString().trim().isLength({ max: 200 }),
  body('ancho').isInt({ min: 1, max: 10000 }).toInt(),
  body('alto').isInt({ min: 1, max: 10000 }).toInt(),
];