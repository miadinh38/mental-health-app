import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
dotenv.config();

export const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '48h',
  })
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { valid: false, expired: true, message: 'Token has expired' };
    } else if (error.name === 'JsonWebTokenError') {
      return { valid: false, expired: false, message: 'Invalid token' };
    } else {
      return { valid: false, expired: false, message: 'Token verification failed' };
    }
  }
};
