import { Router } from 'express'
import { authenticateToken } from '../middleware/authMiddleware.js'
import {
  createComment,
  deleteComment,
  displayAllComments,
  updateComment,
} from '../controllers/commentsController.js'

const router = Router()

router.post('/:postId/comments', authenticateToken, createComment)
router.get('/:postId/comments', authenticateToken, displayAllComments)
router.put('/:postId/comments/:commentId', authenticateToken, updateComment)
router.delete('/:postId/comments/:commentId', authenticateToken, deleteComment)

export default router
