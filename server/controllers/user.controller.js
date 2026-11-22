import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'

// Never send the password hash back to clients.
const publicUser = (user) => {
  const { password, ...rest } = user.toObject()
  return rest
}
const fail = (res, err) =>
  res.status(err.code === 11000 ? 409 : err.name === 'ValidationError' ? 400 : 500)
    .json({ message: err.code === 11000 ? 'Email already registered' : err.message })

export const list = async (req, res) => {
  const users = await User.find().sort({ _id: -1 })
  res.json(users.map(publicUser))
}

export const read = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    user ? res.json(publicUser(user)) : res.status(404).json({ message: 'user not found' })
  } catch (err) { fail(res, err) }
}

// Used by both POST api/users and public sign up. Role is always 'user' unless an admin sets it.
export const create = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }
    const role = req.auth?.role === 'admin' && req.body.role === 'admin' ? 'admin' : 'user'
    const user = await User.create({ name, email, role, password: await bcrypt.hash(password, 10) })
    res.status(201).json(publicUser(user))
  } catch (err) { fail(res, err) }
}

export const update = async (req, res) => {
  try {
    const changes = { name: req.body.name, email: req.body.email, role: req.body.role, updated: Date.now() }
    Object.keys(changes).forEach((key) => changes[key] === undefined && delete changes[key])
    if (req.body.password) changes.password = await bcrypt.hash(req.body.password, 10)
    const user = await User.findByIdAndUpdate(req.params.id, changes, { new: true, runValidators: true })
    user ? res.json(publicUser(user)) : res.status(404).json({ message: 'user not found' })
  } catch (err) { fail(res, err) }
}

export const remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    user ? res.json(publicUser(user)) : res.status(404).json({ message: 'user not found' })
  } catch (err) { fail(res, err) }
}

// Removes every user except admins so the admin account can never be wiped by accident.
export const removeAll = async (req, res) => {
  const result = await User.deleteMany({ role: { $ne: 'admin' } })
  res.json({ message: `${result.deletedCount} user(s) removed (admins kept)` })
}
