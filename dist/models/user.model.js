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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const enumeration_1 = require("../utils/constants/enumeration");
const base_model_1 = __importDefault(require("./base.model"));
const bcrypt = __importStar(require("bcrypt"));
const UserSchema = new mongoose_1.Schema(Object.assign(Object.assign({}, base_model_1.default.obj), { firstName: { type: String, required: true }, lastName: { type: String, required: true }, email: { type: String, required: true, unique: true }, password: { type: String, required: true }, status: { type: String, enum: Object.values(enumeration_1.UserStatus), default: enumeration_1.UserStatus.ACTIVE }, verified: { type: Boolean, default: false }, token: { type: String, default: null } }), {
    timestamps: true,
});
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
UserSchema.methods.toResponse = function () {
    return {
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        status: this.status,
        verified: this.verified,
    };
};
UserSchema.methods.toResponse = function () {
    return {
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        status: this.status,
        verified: this.verified,
    };
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=user.model.js.map