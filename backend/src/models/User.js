import db from './db/dbConfig.js'

// Check if user exists by email
export const getUserByEmail = async (email) => {
  try {
    const string = `SELECT * FROM users WHERE email = $1`
    const param = [email]
    const result = await db.query(string, param)
    return result.rows
  } catch (error) {
    console.error('Error from getUserByEmail model: ', error.message)
    throw error
  }
}

// Add user
export const createUser = async ({ name, email, password, gender, birthday, phone }) => {
  try {
    const query = `
      INSERT INTO users (name, email, password, gender, birthday, phone)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `
    const values = [name, email, password, gender, birthday, phone]
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error from createUser model: ', error.message)
    throw error
  }
}

// Update and save reset password token and expires 
export const updateResetToken = async({hashedToken, expires, email}) => {
  try {
    const query = `UPDATE users 
      SET reset_password_token = $1, reset_password_expires =$2 
      WHERE email = $3 
      RETURNING *;`
    const values = [hashedToken, expires, email]
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error from updateResetToken model: ', error.message)
  }
}