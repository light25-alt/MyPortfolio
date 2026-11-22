import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: 'Name is required', trim: true },
  email: {
    type: String,
    required: 'Email is required',
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: { type: String, required: 'Password is required' }, // stored as a bcrypt hash
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
})

export default mongoose.model('User', UserSchema)
