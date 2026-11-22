import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

// POST auth/signin - verifies credentials and returns a JWT
export const signin = async (req, res) => {
  const email = String(req.body.email || '').toLowerCase().trim()
  const user = await User.findOne({ email })
  if (!user || !(await bcrypt.compare(String(req.body.password || ''), user.password))) {
    return res.status(401).json({ message: 'Email and password do not match' })
  }
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' })
  res.cookie('t', token, { httpOnly: true, sameSite: 'lax', maxAge: 2 * 60 * 60 * 1000 })
  res.json({ token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } })
}

// GET auth/signout - clears the cookie (the client also discards its stored token)
export const signout = (req, res) => {
  res.clearCookie('t')
  res.json({ message: 'Signed out' })
}
