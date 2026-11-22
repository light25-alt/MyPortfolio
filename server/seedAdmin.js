// Ensures the hardcoded admin account exists in the database (Assignment 3 requirement).
import bcrypt from 'bcryptjs'
import User from './models/user.model.js'

export default async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || 'admin@portfolio.com').toLowerCase()
  if (await User.findOne({ email })) return
  await User.create({
    name: 'Administrator',
    email,
    role: 'admin',
    password: await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 10)
  })
  console.log(`Admin account created: ${email}`)
}

// Adds sample portfolio entries on first run so the pages are not empty.
// Replace them from the Admin account (or edit this list).
import Project from './models/project.model.js'
import Qualification from './models/qualification.model.js'

export async function seedSamples() {
  const owner = { firstname: 'Oleksandr', lastname: 'Pereimybida', email: 'sashkopereymybida@gmail.com' }
  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany([
      { ...owner, title: 'Full-Stack Portfolio Application', completion: '2026-12-15', description: 'In progress: a MERN portfolio with React, Express, MongoDB, JWT sign-in and admin/user roles. Role: designing and building the whole stack.' },
      { ...owner, title: 'AI Agent Builder', completion: '2027-03-31', description: 'In progress: learning to build AI agents that use tools and language models to complete tasks. Role: researcher and developer.' },
      { ...owner, title: 'Personal Task Tracker', completion: '2027-06-30', description: 'Planned: a small app to track tasks and study goals, practising React state management and REST APIs. Role: solo developer.' }
    ])
  }
  if ((await Qualification.countDocuments()) === 0) {
    await Qualification.insertMany([
      { ...owner, title: 'Software Engineering - Artificial Intelligence', completion: '2027-12-31', description: 'Centennial College, Toronto (in progress).' },
      { ...owner, title: 'High School Diploma', completion: '2024-06-30', description: 'Etobicoke Collegiate Institute, Etobicoke, ON.' }
    ])
  }
}
