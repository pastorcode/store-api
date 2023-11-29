import {IUser} from "../interfaces/user.interface";
import {User} from "../models/user.model";

export class UserRepository{
    async create(user: IUser){
        const newUser = new User(user);
        return newUser.save();
    }

    async getByEmail(email: string){
        return User.findOne({email});
    }
}