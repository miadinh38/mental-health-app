import { registerUser, loginUser } from '../services/authServices.js';
import { generateToken } from '../utils/jwt.js';

// Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await registerUser({ name, email, password });
    const token = generateToken(user);
    res.status(201).json({ message: 'User registered', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginResult = await loginUser({ email, password });

    if (loginResult.status === 404) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (loginResult.status === 400) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', token: loginResult.token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Logout
export const logout = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};
