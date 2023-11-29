"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const response_dto_1 = require("../../utils/response/response.dto");
const response_enum_1 = require("../../utils/response/response.enum");
const success_message_1 = require("../../utils/constants/success-message");
const http_status_1 = __importDefault(require("http-status"));
class AuthController {
    constructor(authService) {
        this.register = async (req, res, next) => {
            try {
                const response = await this.authService.register(req.body);
                const resObj = new response_dto_1.ResponseDto(response_enum_1.ResponseStatus.SUCCESS, success_message_1.SuccessMessage.REGISTRATION_SUCCESSFUL, response);
                res.status(http_status_1.default.CREATED).send(resObj);
            }
            catch (e) {
                next(e);
            }
        };
        this.verify = async (req, res, next) => {
            try {
                const response = await this.authService.verify(req.params.token);
                const resObj = new response_dto_1.ResponseDto(response_enum_1.ResponseStatus.SUCCESS, success_message_1.SuccessMessage.VERIFICATION_SUCCESSFUL, response);
                res.status(http_status_1.default.OK).send(resObj);
            }
            catch (e) {
                next(e);
            }
        };
        this.requestResetPassword = async (req, res, next) => {
            try {
                const response = await this.authService.requestResetPassword(req.body.email);
                const resObj = new response_dto_1.ResponseDto(response_enum_1.ResponseStatus.SUCCESS, success_message_1.SuccessMessage.REQUEST_RESET_PASSWORD_SUCCESSFUL, response);
                res.status(http_status_1.default.OK).send(resObj);
            }
            catch (e) {
                next(e);
            }
        };
        this.resetPassword = async (req, res, next) => {
            try {
                const response = await this.authService.resetPassword(req.params.token, req.body);
                const resObj = new response_dto_1.ResponseDto(response_enum_1.ResponseStatus.SUCCESS, success_message_1.SuccessMessage.RESET_PASSWORD_SUCCESSFUL, response);
                res.status(http_status_1.default.OK).send(resObj);
            }
            catch (e) {
                next(e);
            }
        };
        this.login = async (req, res, next) => {
            try {
                const response = await this.authService.login(req.body);
                const resObj = new response_dto_1.ResponseDto(response_enum_1.ResponseStatus.SUCCESS, success_message_1.SuccessMessage.LOGIN_SUCCESSFUL, response);
                res.status(http_status_1.default.OK).send(resObj);
            }
            catch (e) {
                next(e);
            }
        };
        this.authService = authService;
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map