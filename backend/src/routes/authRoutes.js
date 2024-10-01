import express from 'express';
import { register, login, authorization, forgotPassword, resetPassword } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/is-verify', authenticateToken, authorization);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
