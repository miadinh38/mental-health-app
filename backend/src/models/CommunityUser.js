import db from './db/dbConfig.js'

// Check if nickname exists
export const checkNicknameExists = async (userId) => {
  try {
    const queryString = `SELECT nickname 
      FROM community_users 
      WHERE user_id = $1;`

    const result = await db.query(queryString, [userId])
    return result.rows
  } catch (error) {
    console.error('Error from checkNicknameExists model: ', error.message)
    throw error
  }
}
// Get users by nickname
export const getUserByNickname = async (nickname) => {
  try {
    const queryString = `SELECT * 
      FROM community_users 
      WHERE nickname = $1;`

    const result = await db.query(queryString, [nickname])
    return result.rows
  } catch (error) {
    console.error('Error from getUseryNicknamemodel: ', error.message)
    throw error
  }
}

// Insert nickname for community users
export const insertNickname = async (userId, nickname) => {
  try {
    const queryInsert = `INSERT INTO community_users(user_id, nickname)
      VALUES ($1, $2)
      RETURNING *;`

    const result = await db.query(queryInsert, [userId, nickname])
    return result.rows
  } catch (error) {
    console.error('Error from insertNickname model: ', error.message)
    throw error
  }
}

// Update agreement_signed to TRUE
export const updateAgreementSigned = async (userId) => {
  try {
    const queryUpdate = `UPDATE community_users 
      SET agreement_signed = TRUE 
      WHERE user_id = $1
      RETURNING *;`
    const result = await db.query(queryUpdate, [userId])
    return result.rows
  } catch (error) {
    console.error('Error from updateAgreementSigned model: ', error.message)
    throw error
  }
}
