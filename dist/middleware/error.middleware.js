"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const http_status_1 = __importDefault(require("http-status"));
const response_enum_1 = require("../utils/response/response.enum");
const response_dto_1 = require("../utils/response/response.dto");
function errorMiddleware(error, req, res, next) {
    const status = error.status || http_status_1.default.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Something went wrong';
    const resObj = new response_dto_1.ResponseDto(response_enum_1.ResponseStatus.ERROR, message);
    res.status(status).send(resObj);
    next();
}
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map