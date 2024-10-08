import { fetchAndSaveArticles, getArticlesWithPagination, searchArticlesService } from "../services/articlesService.js";

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

export const searchArticles = async(req, res) => {
  try {
    const queryInput = req.query.q;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { paginatedArticles, totalCount } = await searchArticlesService(queryInput, limit, offset);
    return res.status(200).json({ paginatedArticles, totalCount });
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error from searching articles controller', message: error.message })  }
}


export const fetchAllArticlesWithPagination = async(req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { articles, totalCount } = await getArticlesWithPagination(limit, offset)
    return res.status(200).json({ articles, totalCount });  
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error from fetching all articles controller', message: error.message })
  }
}