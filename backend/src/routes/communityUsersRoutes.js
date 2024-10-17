import { Router } from 'express';
import { checkCommunityUserExist, createCommunityUser } from '../controllers/communityUserController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router()

router.post('/', authenticateToken, createCommunityUser)
router.get('/has-joined', authenticateToken, checkCommunityUserExist)


export default router;