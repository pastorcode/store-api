import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {WinstonLogger} from "../../utils/logger";
import HttpException from "../../utils/http-exception";
import HttpStatus from "http-status";

dotenv.config();

const logger = new WinstonLogger();
export const MongoDBConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://bigdan:r7iVlLKjXblTjY2a@cluster0.wvrwpyl.mongodb.net/store_db?retryWrites=true&w=majority');
        logger.info('Database Connected Successfully');
        mongoose.set('strictQuery', false);
    } catch (error) {
        logger.error(error.message);
        throw new HttpException('Error Connecting to MongoDB, Reason: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
