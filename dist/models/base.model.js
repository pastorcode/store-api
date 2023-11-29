"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BaseSchema = new mongoose_1.Schema({
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
exports.default = BaseSchema;
//# sourceMappingURL=base.model.js.map