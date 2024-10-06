import express from 'express';
import { insertArticles, fetchAllArticles, fetchSearchArticles, checkArticles } from '../controllers/articlesController.js';
const router = express.Router();

router.post('/', insertArticles)
router.get('/check-articles', checkArticles)
router.get('/', fetchAllArticles)
router.get('/', fetchSearchArticles)

export default router;