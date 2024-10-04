import express from 'express';
import { fetchAllArticles } from '../controllers/articlesController.js';
const router = express.Router();

router.get('/', fetchAllArticles)

export default router;