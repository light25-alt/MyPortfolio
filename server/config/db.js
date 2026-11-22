// Connects Mongoose to MongoDB. With no MONGO_URI (local dev) an in-memory
// MongoDB is started so the app runs without installing MongoDB.
import mongoose from 'mongoose'

export default async function connectDB() {
  let uri = process.env.MONGO_URI
  if (!uri) {
    const { MongoMemoryServer } = await import('mongodb-memory-server')
    const memoryServer = await MongoMemoryServer.create()
    uri = memoryServer.getUri('Portfolio')
    console.log('No MONGO_URI set - using in-memory MongoDB (data resets on restart).')
  }
  await mongoose.connect(uri, { dbName: 'Portfolio' })
  console.log('Connected to the Portfolio database.')
}
