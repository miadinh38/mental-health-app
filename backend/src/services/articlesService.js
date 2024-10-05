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
      await insertArticles(articles)
      const allArticles = await getAllArticles()
      return allArticles
    } else {
      console.error('Error fetching articles:', response.data)
    }
  } catch (error) {
    console.error('Error from fetching articles: ', error)
    throw error
  }
}
