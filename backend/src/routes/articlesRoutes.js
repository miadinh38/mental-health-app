import express from 'express'
import {
  insertArticles,
  fetchAllArticles,
  checkArticles,
  searchArticles,
} from '../controllers/articlesController.js'
const router = express.Router()

router.post('/', insertArticles)
router.get('/check-articles', checkArticles)
router.get('/', fetchAllArticles)
router.get('/search', searchArticles)

export default router
