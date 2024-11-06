import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './app/config'
let server: Server
async function main() {
  // await mongoose.connect(`${config.dbURL as string}`)
  try {
    await mongoose.connect(config.dbURL as string)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(
      'Failed to connect to MongoDB, continuing without database connection',
      error,
    )
  }
  server = app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
  })
}
main()
process.on('unhandledRejection', err => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err)
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`)
  process.exit(1)
})
