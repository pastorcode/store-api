"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const logger_1 = require("../../utils/logger");
const user_model_1 = require("../../models/user.model");
const http_exception_1 = __importDefault(require("../../utils/http-exception"));
const http_status_1 = __importDefault(require("http-status"));
const crypto_1 = __importDefault(require("crypto"));
const user_repository_1 = require("../../repository/user.repository");
const error_message_1 = require("../../utils/constants/error-message");
const jwt_service_1 = require("../../utils/services/jwt/jwt.service");
const bcrypt = __importStar(require("bcrypt"));
class AuthService {
    constructor() {
        this.logger = new logger_1.WinstonLogger();
        this.jwtService = new jwt_service_1.JwtService();
        this.userRepository = new user_repository_1.UserRepository();
    }
    async register(data) {
        let { email, firstName, lastName, password } = data;
        const emailExist = await this.userRepository.getByEmail(email);
        if (emailExist) {
            throw new http_exception_1.default(error_message_1.ErrorMessage.USER_WITH_EMAIL_ALREADY_EXISTS, http_status_1.default.BAD_REQUEST);
        }
        try {
            const token = crypto_1.default.randomBytes(20).toString('hex');
            data.password = await bcrypt.hash(password, 10);
            const user = new user_model_1.User(Object.assign(Object.assign({}, data), { token }));
            const verifyToken = this.jwtService.sign({
                email: email,
                token: token
            }, { expiresIn: '1hr' });
            const newUser = await user.save();
            return Object.assign(Object.assign({}, newUser.toResponse()), { verifyToken });
        }
        catch (e) {
            this.logger.error(e.message);
            throw new http_exception_1.default(e.message, http_status_1.default.INTERNAL_SERVER_ERROR);
        }
    }
    async verify(token) {
        let payload;
        try {
            payload = this.jwtService.verify(token);
            const user = await this.userRepository.getByEmail(payload.email);
            if (!user) {
                throw new http_exception_1.default(error_message_1.ErrorMessage.INVALID_VERIFICATION_TOKEN, http_status_1.default.BAD_REQUEST);
            }
            if (user.token !== payload.token) {
                throw new http_exception_1.default(error_message_1.ErrorMessage.INVALID_VERIFICATION_TOKEN, http_status_1.default.BAD_REQUEST);
            }
            if (user.verified) {
                throw new http_exception_1.default(error_message_1.ErrorMessage.INVALID_VERIFICATION_TOKEN, http_status_1.default.BAD_REQUEST);
            }
            user.verified = true;
            user.token = crypto_1.default.randomBytes(20).toString('hex');
            await user.save();
            return user.toResponse();
        }
        catch (e) {
            this.logger.error(e.message);
            throw new http_exception_1.default(error_message_1.ErrorMessage.INVALID_VERIFICATION_TOKEN, http_status_1.default.INTERNAL_SERVER_ERROR);
        }
    }
    async requestResetPassword(email) {
    }
    async resetPassword(token, data) {
    }
    async login(data) {
        try {
            const { email, password } = data;
            const user = await this.userRepository.getByEmail(email);
            if (!user) {
                throw new http_exception_1.default(error_message_1.ErrorMessage.INVALID_CREDENTIALS, http_status_1.default.BAD_REQUEST);
            }
            if (!user.verified) {
                throw new http_exception_1.default(error_message_1.ErrorMessage.VERIFY_ACCOUNT, http_status_1.default.BAD_REQUEST);
            }
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(isMatch);
            if (!isMatch) {
                throw new http_exception_1.default(error_message_1.ErrorMessage.INVALID_CREDENTIALS, http_status_1.default.BAD_REQUEST);
            }
            const token = this.jwtService.sign({ id: user.id }, { expiresIn: '24hr' });
            return Object.assign(Object.assign({}, user.toResponse()), { authToken: token });
        }
        catch (e) {
            this.logger.error(e.message);
            throw new http_exception_1.default(e.message, http_status_1.default.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map