import db from './db/dbConfig.js'

export const removeArticles = async () => {
  try {
    // Check the current count of articles
    let countResult = await db.query('SELECT COUNT(*) FROM articles;')
    let articleCount = parseInt(countResult.rows[0].count, 10)
    console.log('Articles count before deletion:', articleCount)

    // If the article limit is reached, skip inserting new articles
    while (articleCount >= 100) {
      console.log('Article limit reached. Removing the oldest article.')
      await db.query(`
            DELETE FROM articles
            WHERE id = (
              SELECT id FROM articles
              ORDER BY published_at ASC
              LIMIT 1
            );
          `)
      countResult = await db.query('SELECT COUNT(*) FROM articles;')
      articleCount = parseInt(countResult.rows[0].count, 10);
    }

    // Reset the sequence after deletions
    // await db.query('ALTER SEQUENCE articles_id_seq RESTART WITH 1;');

    const countAfter = await db.query('SELECT COUNT(*) FROM articles;');
    console.log('Articles count after deletion:', countAfter.rows[0].count);
  } catch (error) {
    console.error('Error removing article:', error)
  }
}

//Save articles from external api to db
export const insertArticles = async (articles) => {
  try {
    await removeArticles()
    console.log('Article removed.')

    // Check for existing articles
    for (const article of articles) {
      const existingArticle = await db.query(
        'SELECT * FROM articles WHERE LOWER(url) = LOWER($1) OR LOWER(title) = LOWER($2);',
        [article.url, article.title],
      )

      // If the article doesn't exist, insert to database
      if (existingArticle.rows.length === 0) {
        const insertQuery = `
        INSERT INTO articles (source_name, author, title, description, url, url_to_image, published_at, content)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (url) DO NOTHING;
        `
        if (
          article.source.name === '[Removed]' ||
          article.source.name === 'Slashdot.org' ||
          article.source.name === 'Psychologicalscience.org' ||
          article.source.name === 'BBC News' ||
          article.source.name === 'Biztoc.com' ||
          article.source.name === 'CBS News' ||
          article.source.name === 'Vulture' ||
          article.source.name === 'KENS5.com' ||
          article.source.name === 'Smartbitchestrashybooks.com' ||
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

// Get articles with pagination
export const getArticles = async (limit, offset) => {
  try {
    //Fetch articles with pagniation
    const articlesQuery = `
      SELECT * 
      FROM articles
      ORDER BY published_at DESC
      LIMIT $1 OFFSET $2
    ;`

    const resultArticles = await db.query(articlesQuery, [limit, offset])
    const articles = resultArticles.rows

    // Fetch total count of articles
    const countQuery = `SELECT COUNT(*) FROM articles`
    const result = await db.query(countQuery)
    const totalCount = parseInt(result.rows[0].count, 10)

    return { articles, totalCount }
  } catch (error) {
    console.error('Get article with pagination:', error)
  }
}
