import 'dotenv/config'
import app from './server/express.js'
import connectDB from './server/config/db.js'
import seedAdmin, { seedSamples } from './server/seedAdmin.js'

const port = process.env.PORT || 5001

try {
  await connectDB()
  await seedAdmin()
  await seedSamples()
  app.listen(port, () => console.log(`Server started on port ${port}`))
} catch (err) {
  console.error('Startup failed:', err.message)
  process.exit(1)
}
