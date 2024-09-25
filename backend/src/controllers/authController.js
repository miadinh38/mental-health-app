import { registerUser } from '../services/authService.js'

export const register = async (req, res) => {
  try {
    const { name, email, password, birthday, phone, gender } = req.body
    console.log("Body: ",req.body);

    if (!name || !email || !password) {
      return res.status(400).json({
          errorMessage: 'Name, email, and password are required!',
          errCode: 1
        })
    }
    const newUser = await registerUser({ name, email, password, birthday, phone, gender })
    res.status(201).json({
      errMessage: newUser.errMessage,
      errCode: newUser.errCode
    })
  } catch (error) {
    res
      .status(400)
      .json({ error: 'User registration failed', message: error.message })
  }
}

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
