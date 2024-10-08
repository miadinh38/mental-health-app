import express from 'express'
import {
  insertArticles,
  searchArticles,
  fetchAllArticlesWithPagination,
} from '../controllers/articlesController.js'
const router = express.Router()

router.post('/', insertArticles)
router.get('/', fetchAllArticlesWithPagination)
router.get('/search', searchArticles)

export default router
