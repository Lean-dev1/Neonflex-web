import { Router } from 'express';
import { quoteLimiter } from '../middlewares/rateLimiters.js';
import { validate } from '../middlewares/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { cotizacionValidators } from '../validators/cotizacion.validators.js';
import { enviarCotizacion } from '../controllers/cotizaciones.controller.js';

const router = Router();


router.post('/enviar', quoteLimiter, cotizacionValidators, validate, asyncHandler(enviarCotizacion));

export default router;