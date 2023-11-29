import {UserStatus} from "../utils/constants/enumeration";
import {BaseDocument} from "./base-document.interface";

export interface IUser extends BaseDocument{
    firstName: string
    lastName: string
    email: string
    password: string
    status: UserStatus
    verified: boolean
    token: string
    comparePassword(password: string): Promise<boolean>
    toResponse(): {
        id: string
        firstName: string
        lastName: string
        email: string
        status: UserStatus
        verified: boolean
    }
}