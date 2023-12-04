import app from './app'
import dotenv from 'dotenv'
import { WinstonLogger } from './utils/logger'
import { MongoDBConnection } from './database/mongodb/connect.mongodb'
const logger = new WinstonLogger()
dotenv.config()

const PORT = process.env.PORT || 3005

async function bootstrap () {
  try {
    await MongoDBConnection()
    app.listen(PORT, () => {
      logger.info(`Starting server at http://localhost:${PORT}`)
    })
  } catch (e) {
    logger.error(e)
  }
}

bootstrap()
