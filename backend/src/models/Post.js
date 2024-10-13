import db from './db/dbConfig.js'


// Create new post
export const insertPost = async (communityUserId, content) => {
  try {
    const queryString = `INSERT INTO posts(community_user_id, content) VALUES ($1, $2) RETURNING *;`

    const result = await db.query(queryString, [communityUserId, content])
    console.log('From insertPost model: ', result.rows)
    return result.rows
  } catch (error) {
    console.error('Error from insertPost model: ', error.message)
    throw error
  }
}

// Select all posts
export const getAllPosts = async() => {
  try {
    const query = `SELECT * FROM posts ORDER BY created_at DESC;`
    const result =  await db.query(query);
    return result.rows; 
  } catch (error) {
    console.error('Error from getAllPosts model: ', error.message)
    throw error
  }
}


// Update post
export const updatePostQuery = async(postId, content) => {
  try {
    const queryString = `UPDATE posts SET content = $1 WHERE id = $2 RETURNING *;`
    const result = await db.query(queryString, [content, postId])
    return result.rows; 
  } catch (error) {
    console.error('Error from updatePost model: ', error.message)
    throw error
  }
}

// Delete post
export const deletePostQuery = async(postId) => {
  try {
    const queryString = `DELETE FROM posts WHERE id = $1 RETURNING *;`
    return await db.query(queryString, [postId])
  } catch (error) {
    console.error('Error from updatePost model: ', error.message)
    throw error
  }
}


//getPostById
export const getPostById = async(postId) => {
  try {
    const query = `SELECT * FROM posts WHERE id=$1;`
    const result =  await db.query(query, [postId]);
    return result.rows; 
  } catch (error) {
    console.error('Error from getAllPosts model: ', error.message)
    throw error
  }
}
