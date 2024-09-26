import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
dotenv.config();

export const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '48h',
  })
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
