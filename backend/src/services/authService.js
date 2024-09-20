
import pool from '../config/databasepg.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registrar usuario
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

// Login usuario
export const loginUser = async ({ email, password }) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);

  if (result.rows.length === 0) {
    throw new Error('User not found');
  }

  const user = result.rows[0];
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};
