"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class JwtService {
    sign(payload, options) {
        return jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, options);
    }
    verify(token) {
        return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
    }
}
exports.JwtService = JwtService;
//# sourceMappingURL=jwt.service.js.map