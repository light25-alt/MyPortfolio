import jwt from 'jsonwebtoken'

// Accepts the JWT from an Authorization: Bearer header or the 't' cookie.
export const requireSignin = (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : req.cookies?.t
  try {
    req.auth = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ message: 'Please sign in first' })
  }
}

export const requireAdmin = (req, res, next) =>
  req.auth?.role === 'admin' ? next() : res.status(403).json({ message: 'Admin access required' })

// Attaches req.auth when a valid token is present but never blocks (used by public signup).
export const optionalAuth = (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : req.cookies?.t
  try { req.auth = jwt.verify(token, process.env.JWT_SECRET) } catch { /* anonymous */ }
  next()
}
