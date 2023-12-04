import { createLogger, transports, format, type Logger } from 'winston'
const { combine, timestamp, printf, colorize, json } = format

export class WinstonLogger {
  private readonly logger: Logger
  constructor () {
    this.logger = createLogger({
      format: combine(
        timestamp(),
        colorize(),
        json(),
        printf(({ timestamp, level, message, metadata }) => {
          if (metadata) {
            return `${timestamp} ${level}: ${message} ${JSON.stringify(metadata)}`
          } else {
            return `${timestamp} ${level}: ${message}`
          }
        })
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs.log' })
      ]
    })
  }

  log (level: string, message: string, metadata?: any | null) {
    if (metadata) {
      this.logger.log(level, message, { metadata })
    } else {
      this.logger.log(level, message)
    }
  }

  info (message: string, metadata?: any | null) {
    this.log('info', message, metadata)
  }

  warn (message: string, metadata?: any | null) {
    this.log('warn', message, metadata)
  }

  error (message: string, metadata?: any | null) {
    this.log('error', message, metadata)
  }

  debug (message: string, metadata?: any | null) {
    this.log('debug', message, metadata)
  }
}
