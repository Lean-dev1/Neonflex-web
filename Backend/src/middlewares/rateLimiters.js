import rateLimit from 'express-rate-limit';


const limiter = (windowMs, max, message, extra = {}) =>
  rateLimit({ windowMs, max, message: { message }, standardHeaders: true, legacyHeaders: false, ...extra });


export const globalLimiter = limiter(
  15 * 60 * 1000, 
  300, 
  'Demasiadas solicitudes. Intentá más tarde.'
);

export const loginLimiter = limiter(
  60 * 60 * 1000, 
  5,
  'Demasiados intentos de inicio de sesión. Intentá de nuevo en una hora.',
  { skipSuccessfulRequests: true } 
);


export const quoteLimiter = limiter(
  60 * 60 * 1000, 
  3,
  'Superaste el límite de solicitudes. Intentá de nuevo en una hora o contactanos por WhatsApp.'
);