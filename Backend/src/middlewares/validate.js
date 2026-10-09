import { validationResult } from 'express-validator';
import { removeTempFiles } from '../utils/files.js';

export const validate = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next(); // Si todo está bien, pasa al controlador

  // Si hubo error de validación, limpiamos la imagen temporal que el middleware imageUpload acaba de guardar
  await removeTempFiles(req.files);
  
  return res.status(400).json({
    message: 'Datos inválidos. Revisa los campos del formulario.',
    errors: errors.array().map(({ path, msg }) => ({ field: path, message: msg })),
  });
};