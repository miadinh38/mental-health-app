import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

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
