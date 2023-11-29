"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../../utils/logger");
const http_exception_1 = __importDefault(require("../../utils/http-exception"));
const http_status_1 = __importDefault(require("http-status"));
dotenv_1.default.config();
const logger = new logger_1.WinstonLogger();
const MongoDBConnection = async () => {
    try {
        await mongoose_1.default.connect('mongodb+srv://bigdan:r7iVlLKjXblTjY2a@cluster0.wvrwpyl.mongodb.net/store_db?retryWrites=true&w=majority');
        logger.info('Database Connected Successfully');
        mongoose_1.default.set('strictQuery', false);
    }
    catch (error) {
        logger.error(error.message);
        throw new http_exception_1.default('Error Connecting to MongoDB, Reason: ' + error.message, http_status_1.default.INTERNAL_SERVER_ERROR);
    }
};
exports.MongoDBConnection = MongoDBConnection;
//# sourceMappingURL=connect.mongodb.js.map