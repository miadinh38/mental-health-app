import express from 'express';
import { register, login, authorization } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/is-verify', authenticateToken, authorization);

export default router;
