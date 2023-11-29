"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const validator_middleware_1 = require("../../middleware/validator.middleware");
const register_dto_1 = require("./dtos/register.dto");
const router = (0, express_1.Router)();
const authService = new auth_service_1.AuthService();
const authController = new auth_controller_1.AuthController(authService);
router.post('/register', (0, validator_middleware_1.validateBody)(register_dto_1.RegisterDto), authController.register);
router.post('/login', authController.login);
router.get('/verify/:token', authController.verify);
router.post('/request-reset', authController.requestResetPassword);
router.post('/reset', authController.resetPassword);
exports.default = router;
//# sourceMappingURL=auth.route.js.map