import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
  firstname: { type: String, required: 'First name is required', trim: true },
  lastname: { type: String, required: 'Last name is required', trim: true },
  email: { type: String, required: 'Email is required', trim: true },
  phone: { type: String, trim: true },
  message: { type: String, trim: true },
  created: { type: Date, default: Date.now }
})

export default mongoose.model('Contact', ContactSchema)
