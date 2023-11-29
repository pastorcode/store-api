"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonLogger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize, json } = winston_1.format;
class WinstonLogger {
    constructor() {
        this.logger = (0, winston_1.createLogger)({
            format: combine(timestamp(), colorize(), json(), printf(({ timestamp, level, message, metadata }) => {
                if (metadata) {
                    return `${timestamp} ${level}: ${message} ${JSON.stringify(metadata)}`;
                }
                else {
                    return `${timestamp} ${level}: ${message}`;
                }
            })),
            transports: [
                new winston_1.transports.Console(),
                new winston_1.transports.File({ filename: 'logs.log' }),
            ]
        });
    }
    log(level, message, metadata) {
        if (metadata) {
            this.logger.log(level, message, { metadata });
        }
        else {
            this.logger.log(level, message);
        }
    }
    info(message, metadata) {
        this.log('info', message, metadata);
    }
    warn(message, metadata) {
        this.log('warn', message, metadata);
    }
    error(message, metadata) {
        this.log('error', message, metadata);
    }
    debug(message, metadata) {
        this.log('debug', message, metadata);
    }
}
exports.WinstonLogger = WinstonLogger;
//# sourceMappingURL=logger.js.map