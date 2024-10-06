import { query } from "express";
import { fetchAndSaveArticles, getArticles, searchArticlesService } from "../services/articlesService.js";

export const insertArticles = async(req, res) => {
  try {
    await fetchAndSaveArticles()
    return res.status(200).json({
      sucess: true,
      message: "Articles have been inserted to database"
    });  
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error from saving articles controller', message: error.message })
  }
}

export const fetchAllArticles = async(req, res) => {
  try {
    const allArticles = await getArticles()
    return res.status(200).json(allArticles);  
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error from fetching all articles controller', message: error.message })
  }
}

export const checkArticles = async(req, res) => {
  try {
    const result = await getArticles()
    if (result.length > 0 ){
      return res.status(200).json({ hasArticle: true });
    } else {
      return res.status(200).json({ hasArticle: false });
    }
  } catch (error) {
    console.error({ error: 'Error from checking articles controller', message: error.message })
  }
}

export const searchArticles = async(req, res) => {
  try {
    const queryInput = req.query.q;
    const data = await searchArticlesService(queryInput);
    return res.status(200).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error from searching articles controller', message: error.message })  }
}
