import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import { loginLimiter } from '../middlewares/rateLimiters.js';

const router = Router();

router.post('/login', loginLimiter, login);

export default router;