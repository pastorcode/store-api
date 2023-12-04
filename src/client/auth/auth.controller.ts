import { type NextFunction, type Request, type RequestHandler, type Response } from 'express'
import { ResponseDto } from '../../utils/response/response.dto'
import { ResponseStatus } from '../../utils/response/response.enum'
import { SuccessMessage } from '../../utils/constants/success-message'
import HttpStatus from 'http-status'
import { type AuthService } from './auth.service'
import { type RegisterDto } from './dtos/register.dto'
import { type ResetPasswordDto } from './dtos/reset-password.dto'
import { type LoginDto } from './dtos/login.dto'

/**
 * @summary Auth Controller
 */
export class AuthController {
  private readonly authService: AuthService

  constructor (authService: AuthService) {
    this.authService = authService
  }

  register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.authService.register(req.body as RegisterDto)
      const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessage.REGISTRATION_SUCCESSFUL, response)
      res.status(HttpStatus.CREATED).send(resObj)
    } catch (e) {
      next(e)
    }
  }

  verify: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.authService.verify(req.params.token)
      const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessage.VERIFICATION_SUCCESSFUL, response)
      res.status(HttpStatus.OK).send(resObj)
    } catch (e) {
      next(e)
    }
  }

  requestResetPassword: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.authService.requestResetPassword(req.body.email)
      const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessage.REQUEST_RESET_PASSWORD_SUCCESSFUL, response)
      res.status(HttpStatus.OK).send(resObj)
    } catch (e) {
      next(e)
    }
  }

  resetPassword: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.authService.resetPassword(req.params.token, req.body as ResetPasswordDto)
      const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessage.RESET_PASSWORD_SUCCESSFUL, response)
      res.status(HttpStatus.OK).send(resObj)
    } catch (e) {
      next(e)
    }
  }

  login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.authService.login(req.body as LoginDto)
      const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessage.LOGIN_SUCCESSFUL, response)
      res.status(HttpStatus.OK).send(resObj)
    } catch (e) {
      next(e)
    }
  }
}
