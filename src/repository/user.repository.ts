import { type IUser } from '../interfaces/user.interface'
import { User } from '../models/user.model'

export class UserRepository {
  async create (user: IUser) {
    const newUser = new User(user)
    return await newUser.save()
  }

  async getByEmail (email: string) {
    return await User.findOne({ email })
  }
}
