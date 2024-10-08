import axios from 'axios'
import {
  insertArticles,
  getArticles,
} from '../models/Article.js'
import dotenv from 'dotenv'
dotenv.config()

const apiUrl = `https://newsapi.org/v2/everything`
const query = `mental health AND teen NOT shooting NOT prison NOT arrest NOT jail NOT sex NOT suicidal NOT drug`
const apiKey = process.env.NEWS_API_KEY

export const fetchAndSaveArticles = async () => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: query,
        pageSize: 100,
        apiKey: apiKey,
        sortBy: 'publishedAt',
        language: 'en',
        excludeDomains: 'businessinsider.com',
      },
    })
    if (response.data.status === 'ok') {
      const articles = response.data.articles

      // Save fetched articles to the database
      return await insertArticles(articles)
    } else {
      console.error('Error fetching articles:', response.data)
    }
  } catch (error) {
    console.error(
      'Error from calling external api and saving articles: ',
      error,
    )
    throw error
  }
}

export const searchArticlesService = async (queryInput, limit, offset) => {
  try {
    const searchQuery = `${query} AND ${queryInput}`

    const response = await axios.get(apiUrl, {
      params: {
        q: searchQuery,
        pageSize: 100,
        apiKey: apiKey,
        sortBy: 'publishedAt',
        language: 'en',
        excludeDomains: 'businessinsider.com',
      },
    })

    if (response.data.status === 'ok') {
      const articles = response.data.articles

      if (articles.length > 0) {
        const filteredArticles = articles.filter(
          (article) =>
            article.source.name !== '[Removed]' &&
            article.source.name !== 'BBC News' &&
            article.source.name !== 'Slashdot.org' &&
            article.source.name !== 'Psychologicalscience.org' &&
            article.source.name !== 'Biztoc.com' &&
            article.source.name !== 'CBS News' &&
            article.source.name !== 'KENS5.com' &&
            article.author !== 'BARBARA ORTUTAY AP technology writer' &&
            article.urlToImage !== null,
        )

        const totalCount = filteredArticles.length;
        const paginatedArticles = filteredArticles.slice(offset, offset + limit);

        if (totalCount > 0) {
          return { paginatedArticles, totalCount }
        } else {
          return { message: 'No relevant articles found.' }
        }
      } else {
        return { message: 'No articles found.' }
      }
    } else {
      return { message: 'Error fetching articles.' }
    }
  } catch (error) {
    console.error('Error from searching articles service: ', error)
    throw error
  }
}

export const getArticlesWithPagination = async (limit, offset) => {
  try {
    const { articles, totalCount } = await getArticles(limit, offset)
    return { articles, totalCount }
  } catch (error) {
    console.error(
      'Error from fetching articles with pagniation service: ',
      error,
    )
    throw error
  }
}
