import { Router } from 'express'
import { authenticateToken } from '../middleware/authMiddleware.js'
import {
  createPost,
  displayAllPosts,
  updatePost,
  deletePost,
} from '../controllers/postsController.js'

const router = Router()

router.post('/', authenticateToken, createPost)
router.get('/', authenticateToken, displayAllPosts)
router.put('/:id', authenticateToken, updatePost)
router.delete('/:id', authenticateToken, deletePost)

export default router
