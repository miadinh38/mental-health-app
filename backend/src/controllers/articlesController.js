import { fetchAndSaveArticles } from "../services/articlesService.js";

export const fetchAllArticles = async(req, res) => {
  try {
    const allArticles = await fetchAndSaveArticles()
    return res.status(200).json(allArticles);  
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error from fetching all articles controller', message: error.message })
  }
}
