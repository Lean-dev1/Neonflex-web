import dotenv from 'dotenv';
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

const required = [
  'DATABASE_URL', 'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET',
  'EMAIL_USER', 'EMAIL_PASS'
];

if (isProd) {
  required.push('FRONTEND_URL', 'PUBLIC_HOST'); // Agregamos PUBLIC_HOST en producción
}

const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`❌ FATAL ERROR: Faltan variables de entorno: ${missing.join(', ')}`);
  process.exit(1); 
}

if (process.env.JWT_SECRET.length < 32) {
  console.error('❌ FATAL ERROR: JWT_SECRET debe tener al menos 32 caracteres.');
  process.exit(1);
}

export const env = {
  isProd,
  port: Number(process.env.PORT) || 3000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5174',
  publicHost: process.env.PUBLIC_HOST || 'localhost:3000', // El dominio de tu backend
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  email: { 
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  }
};