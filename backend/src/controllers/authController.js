import { registerUser, loginUser } from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser({ name, email, password });
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser({ email, password });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};
