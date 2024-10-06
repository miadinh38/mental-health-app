import axios from 'axios'
import { getAllArticles, insertArticles } from '../models/Article.js'
import dotenv from 'dotenv'
dotenv.config()

export const fetchAndSaveArticles = async () => {
  try {
    const apiUrl = `https://newsapi.org/v2/everything`
    const query = `mental health AND teen NOT shooting NOT prison NOT jail`
    const apiKey = process.env.NEWS_API_KEY

    const response = await axios.get(apiUrl, {
      params: {
        q: query,
        pageSize: 100,
        apiKey: apiKey,
        excludeDomains: 'businessinsider.com'
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
    console.error('Error from calling external api and saving articles: ', error)
    throw error
  }
}

export const getArticles = async() => {
  try {
    const allArticles = await getAllArticles();
    return allArticles
  } catch (error) {
    console.error('Error from fetching all articles: ', error)
    throw error
  }
}