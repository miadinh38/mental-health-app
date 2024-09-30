import {
  registerUser,
  loginUser,
  forgotPasswordService,
} from '../services/authService.js'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        errorMessage: 'Name, email, and password are required!',
        errCode: 1,
      })
    }
    const newUser = await registerUser(req.body)
    res.status(201).json({
      errMessage: newUser.errMessage,
      errCode: newUser.errCode,
      token: newUser.token,
    })
  } catch (error) {
    res
      .status(400)
      .json({ error: 'User registration failed', message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body)
    res.status(200).json({
      errMessage: data.errMessage,
      errCode: data.errCode,
      token: data.token,
    })
  } catch (error) {
    res.status(400).json({ error: 'User login failed', message: error.message })
  }
}

export const authorization = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user,
    })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Authrization failed', message: error.message })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const data = await forgotPasswordService({ email })
    res.status(200).json({
      errMessage: data.errMessage,
      errCode: data.errCode,
    })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Reset forgot-password failed', message: error.message })
  }
}

export const resetPassword = () => {}
