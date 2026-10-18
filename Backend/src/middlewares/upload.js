import os from 'os';
import fileUpload from 'express-fileupload';
import { env } from '../config/env.js'; // Importamos el entorno
import { removeTempFiles } from '../utils/files.js';

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);

const checkImage = async (req, res, next) => {
  const file = req.files?.image;
  if (!file) return next();
  
  if (Array.isArray(file) || !ALLOWED_MIME.has(file.mimetype)) {
    await removeTempFiles(req.files);
    // Unificamos la puntuación: siempre terminamos con punto.
    return res.status(400).json({ message: 'Imagen inválida: un solo archivo JPG, PNG o WEBP.' });
  }
  next();
};

export const imageUpload = [
  fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
    limits: { fileSize: env.constants.MAX_FILE_SIZE }, // Usamos la constante
    abortOnLimit: true,
    // Hack maestro: Forzamos a que el límite devuelva un JSON en vez de texto plano
    responseOnLimit: JSON.stringify({ message: 'La imagen supera los 5 MB.' }), 
  }),
  checkImage,
];