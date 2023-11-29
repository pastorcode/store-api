import { BaseDocument } from "../interfaces/base-document.interface";
import { Schema } from "mongoose";

const BaseSchema = new Schema<BaseDocument>(
    {
        deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    });

export default BaseSchema;
