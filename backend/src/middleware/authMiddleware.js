import { verifyToken } from '../utils/jwt.js'

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Extract token from "Bearer token"

  if (!token || token === "undefined" || token === "null") {
    return res.status(401).json({ error: 'Access denied: No token provided' });
  }
  try {
    const user = verifyToken(token)
    req.user = user // Attach user info to request
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' })
  }
}
