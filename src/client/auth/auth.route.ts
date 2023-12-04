import { Router } from 'express'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { validateBody } from '../../middleware/validator.middleware'
import { RegisterDto } from './dtos/register.dto'

const router = Router()

const authService = new AuthService()
const authController = new AuthController(authService)

router.post('/register', validateBody(RegisterDto), authController.register)
router.post('/login', authController.login)
router.get('/verify/:token', authController.verify)
router.post('/request-reset', authController.requestResetPassword)
router.post('/reset', authController.resetPassword)

export default router
