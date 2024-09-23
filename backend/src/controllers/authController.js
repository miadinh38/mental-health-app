import bcrypt from 'bcrypt'
import pool from '../db.js'
import { generateToken } from '../utils/jwt.js'

//Register
export const register = async (req, res) => {
  const { name, email, password } = req.body

  try {
    // Check if user already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Store user in the database
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword],
    )

    // Generate JWT token
    const token = generateToken(result.rows[0])

    res.status(201).json({ message: 'User registered', token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//Login
export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const user = result.rows[0]

    // Check if password matches
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    // Generate JWT token
    const token = generateToken(user)

    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

//Logout
export const logout = (req, res) => {
  res.status(200).json({ message: 'Logout successful' })
}

// import { registerUser, loginUser } from '../services/authService.js';

// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = await registerUser({ name, email, password });
//     res.status(201).json({ message: 'User registered', user });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const token = await loginUser({ email, password });
//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const logout = (req, res) => {
//   res.status(200).json({ message: 'Logout successful' });
// };
