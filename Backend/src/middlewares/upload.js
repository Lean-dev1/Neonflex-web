import os from 'os';
import fileUpload from 'express-fileupload';
import { removeTempFiles } from '../utils/files.js';

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);

const checkImage = async (req, res, next) => {
  const file = req.files?.image;
  if (!file) return next();
  
  if (Array.isArray(file) || !ALLOWED_MIME.has(file.mimetype)) {
    await removeTempFiles(req.files);
    return res.status(400).json({ message: 'Imagen inválida: un solo archivo JPG, PNG o WEBP.' });
  }
  next();
};

// Exportamos un array de middlewares que se ejecutarán en cadena
export const imageUpload = [
  fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(), // Usa la RAM o el directorio temporal del servidor (se limpia solo)
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: 'La imagen supera los 5 MB.',
  }),
  checkImage,
];