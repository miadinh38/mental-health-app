import axios from 'axios'
import { getAllArticles, insertArticles } from '../models/Article.js'
import dotenv from 'dotenv'
import { searchArticles } from '../controllers/articlesController.js'
dotenv.config()

const apiUrl = `https://newsapi.org/v2/everything`
const query = `mental health AND teen NOT shooting NOT prison NOT jail`
const apiKey = process.env.NEWS_API_KEY

export const fetchAndSaveArticles = async () => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: query,
        pageSize: 100,
        apiKey: apiKey,
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

export const getArticles = async () => {
  try {
    const allArticles = await getAllArticles()
    return allArticles
  } catch (error) {
    console.error('Error from fetching all articles: ', error)
    throw error
  }
}

export const searchArticlesService = async (queryInput) => {
  try {
    const searchQuery = `${query} AND ${queryInput}`

    const response = await axios.get(apiUrl, {
      params: {
        q: searchQuery,
        pageSize: 100,
        apiKey: apiKey,
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
            article.urlToImage !== null,
        )

        if (filteredArticles.length > 0) {
          return filteredArticles
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
