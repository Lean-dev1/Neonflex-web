import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const verificarToken = (req, res, next) => {
  const [scheme, token] = (req.headers.authorization ?? '').split(' ');
  
  // 401 es lo semánticamente correcto ("No sé quién sos")
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'No autenticado.' });
  }

  let decoded;
  try {
    // Forzamos algoritmo y emisor para evitar tokens falsificados
    decoded = jwt.verify(token, env.jwtSecret, { 
      algorithms: ['HS256'], 
      issuer: 'neonflex-api' 
    });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }

  req.user = decoded;
  // Al estar afuera, si el controlador posterior falla, el error lo maneja tu index.js, no este catch
  next(); 
};