import { Server } from 'http'
import mongoose from 'mongoose'
import cron from 'node-cron'
import app from './app'
import config from './app/config'
import seedSuperAdmin from './app/DB'
import { backupDatabase, backupMongoDB } from './app/utils/backupDatabase'
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
  seedSuperAdmin()
  // Schedule both tasks
  cron.schedule('0 0 */30 * *', backupDatabase); // Backup every 45 days
  // cron.schedule('*/1 * * * *', backupDatabase); // Backup every 45 days
  // cron.schedule('*/1 * * * *', backupMongoDB); // Backup every 45 days


  // backupDatabase() // Backup every 45 days
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
