"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("../models/user.model");
class UserRepository {
    async create(user) {
        const newUser = new user_model_1.User(user);
        return newUser.save();
    }
    async getByEmail(email) {
        return user_model_1.User.findOne({ email });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map