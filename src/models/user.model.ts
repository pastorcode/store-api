import {Schema, model} from "mongoose";
import {IUser} from "../interfaces/user.interface";
import {UserStatus} from "../utils/constants/enumeration";
import BaseSchema from "./base.model";
import * as bcrypt from "bcrypt";

const UserSchema = new Schema<IUser>(
    {
        ...BaseSchema.obj,
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        status: {type: String, enum: Object.values(UserStatus), default: UserStatus.ACTIVE},
        verified: {type: Boolean, default: false},
        token: {type: String, default: null},
    },
    {
        timestamps: true,
    }
)


UserSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.toResponse = function () {
    return {
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        status: this.status,
        verified: this.verified,

    }
};

UserSchema.methods.toResponse = function () {
    return{
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        status: this.status,
        verified: this.verified,

    }
}


export const User = model<IUser>('User', UserSchema);