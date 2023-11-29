"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDto = void 0;
class ResponseDto {
    constructor(status, message, data = null) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
exports.ResponseDto = ResponseDto;
//# sourceMappingURL=response.dto.js.map