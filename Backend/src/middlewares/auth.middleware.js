import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

// Renombrado de verificarToken a verifyToken
export const verificarToken = (req, res, next) => {
  const [scheme, token] = (req.headers.authorization ?? '').split(' ');
  
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'No autenticado.' }); // Con punto
  }

  let decoded;
  try {
    decoded = jwt.verify(token, env.jwtSecret, { 
      algorithms: ['HS256'], 
      issuer: 'neonflex-api' 
    });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' }); // Con punto
  }

  req.user = decoded;
  next(); 
};