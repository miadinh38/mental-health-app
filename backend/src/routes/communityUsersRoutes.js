import { Router } from 'express';
import { createCommunityUser } from '../controllers/communityUserController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router()

// Insert nickanme and agreement to db - New community user
router.post('/', authenticateToken, createCommunityUser)

export default router;