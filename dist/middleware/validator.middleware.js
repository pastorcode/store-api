"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const http_exception_1 = __importDefault(require("../utils/http-exception"));
const http_status_1 = __importDefault(require("http-status"));
function validateBody(dtoType) {
    return async (req, res, next) => {
        const errors = await (0, class_validator_1.validate)((0, class_transformer_1.plainToInstance)(dtoType, req.body));
        if (errors.length > 0) {
            const message = errors
                .map((error) => { var _a; return (_a = Object.values(error.constraints || '')) === null || _a === void 0 ? void 0 : _a.join(', '); })
                .filter(Boolean)
                .join(', ');
            next(new http_exception_1.default(message, http_status_1.default.BAD_REQUEST));
        }
        else {
            next();
        }
    };
}
exports.validateBody = validateBody;
//# sourceMappingURL=validator.middleware.js.map