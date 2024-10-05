import db from './db/dbConfig.js'

//Save articles from external api to db
export const insertArticles = async (articles) => {
  try {
    // Check for existing articles
    for (const article of articles) {
      const existingArticle = await db.query(
        'SELECT * FROM articles WHERE url = $1',
        [article.url],
      )

      // If the article doesn't exist, insert to database
      if (existingArticle.rows.length === 0) {
        const insertQuery = `
        INSERT INTO articles (source_name, author, title, description, url, url_to_image, published_at, content)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `
        if (
          article.source.name === '[Removed]' ||
          article.source.name === 'Slashdot.org' ||
          article.source.name === 'Psychologicalscience.org' ||
          article.source.name === 'BBC News' ||
          article.source.name === 'Biztoc.com' ||
          article.author === 'BARBARA ORTUTAY AP technology writer' ||
          !article.urlToImage
        ) {
          continue // Skip this article
        }

        const values = [
          article.source.name,
          article.author || null,
          article.title,
          article.description,
          article.url,
          article.urlToImage,
          article.publishedAt ? new Date(article.publishedAt) : null, // Format to ISO string
          article.content || null,
        ]

        await db.query(insertQuery, values)
      }
    }
  } catch (error) {
    console.error('Error saving article:', error)
  }
}

//Get all articles
export const getAllArticles = async () => {
  const query = `SELECT * FROM articles;`
  try {
    const result = await db.query(query)
    return result.rows
  } catch (error) {
    console.error('Get all article:', error)
  }
}
