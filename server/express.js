import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import contactRoutes from './routes/contact.routes.js'
import projectRoutes from './routes/project.routes.js'
import qualificationRoutes from './routes/qualification.routes.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Welcome message required by Assignment 2
app.get('/api', (req, res) => res.json({ message: 'Welcome to My Portfolio application.' }))

app.use(contactRoutes, projectRoutes, qualificationRoutes, userRoutes, authRoutes)

// In production serve the built React app from the same server.
const clientDist = path.join(path.dirname(fileURLToPath(import.meta.url)), '../client/dist')
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist))
  app.get(/^\/(?!api|auth).*/, (req, res) => res.sendFile(path.join(clientDist, 'index.html')))
}

export default app
