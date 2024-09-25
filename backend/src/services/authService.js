import pool from '../config/databasepg.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register user
export const registerUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email;
  `;
  const values = [name, email, hashedPassword];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Login user
export const loginUser = async ({ email, password }) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);

  if (result.rows.length === 0) {
    return { status: 404, message: 'User not found' };
  }

  const user = result.rows[0];
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return { status: 400, message: 'Invalid password' };
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { status: 200, token };
};
