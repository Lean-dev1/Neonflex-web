import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import { loginLimiter } from '../middlewares/rateLimiters.js';
import { asyncHandler } from '../utils/asyncHandler.js'; // Importamos el wrapper

const router = Router();
router.post('/login', loginLimiter, asyncHandler(login)); // Lo envolvemos

export default router;