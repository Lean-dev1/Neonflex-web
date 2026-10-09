import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
  secure: true,
});

export const uploadImage = (filePath) =>
  cloudinary.uploader.upload(filePath, {
    folder: 'neonflex_products',
    resource_type: 'image',
    allowed_formats: ['jpg', 'png', 'webp'], // Validación estricta en el servidor de destino
    format: 'webp',
    transformation: [{ width: 1600, height: 1600, crop: 'limit', quality: 'auto' }], // Previene bombas de descompresión
    timeout: 30_000,
  });

export const deleteImage = (publicId) => cloudinary.uploader.destroy(publicId, { invalidate: true });