import db from './db/dbConfig.js'

// Get comment by ID
export const getPostById = async(commentId, postId) => {
  try {
    const query = `SELECT * FROM comments WHERE id = $1 AND post_id = $2;`
    const result =  await db.query(query, [commentId, postId]);
    return result.rows; 
  } catch (error) {
    console.error('Error from getPostById model: ', error.message)
    throw error
  }
}

// Get all comments associated with a post
export const getAllCommentsQuery = async (postId) => {
  try {
    const query = `SELECT * FROM comments WHERE post_id = $1;`
    const result = await db.query(query, [postId])
    return result.rows
  } catch (error) {
    console.error('Error from getAllComments model: ', error.message)
    throw error
  }
}

// Insert new comment
export const insertCommentQuery = async (communityUserId, content, postId) => {
  try {
    const queryString = `INSERT INTO comments(community_user_id, content, post_id) 
      VALUES ($1, $2, $3) 
      RETURNING *;`

    const result = await db.query(queryString, [
      communityUserId,
      content,
      postId,
    ])
    return result.rows
  } catch (error) {
    console.error('Error from insertComment model: ', error.message)
    throw error
  }
}

// Update a comment
export const updateCommentQuery = async (commentId, content, postId) => {
  try {
    const queryString = `UPDATE comments 
    SET content = $1 
    WHERE id = $2 AND post_id = $3 
    RETURNING *;`
    const result = await db.query(queryString, [content, commentId, postId])
    return result.rows
  } catch (error) {
    console.error('Error from updateComment model: ', error.message)
    throw error
  }
}

// Delete a comment
export const deleteCommentQuery = async (commentId, postId) => {
  try {
    const queryString = `DELETE FROM comments 
    WHERE id = $1 AND post_id = $2 
    RETURNING *;`
    return await db.query(queryString, [commentId, postId])
  } catch (error) {
    console.error('Error from deleteCommentQuery model: ', error.message)
    throw error
  }
}
