"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("./utils/logger");
const connect_mongodb_1 = require("./database/mongodb/connect.mongodb");
const logger = new logger_1.WinstonLogger();
dotenv_1.default.config();
const PORT = process.env.PORT || 3005;
async function bootstrap() {
    try {
        await (0, connect_mongodb_1.MongoDBConnection)();
        app_1.default.listen(PORT, () => {
            logger.info(`Starting server at http://localhost:${PORT}`);
        });
    }
    catch (e) {
        logger.error(e);
    }
}
bootstrap();
//# sourceMappingURL=server.js.map