import { WinstonLogger } from '../../utils/logger'
import { User } from '../../models/user.model'
import HttpException from '../../utils/http-exception'
import HttpStatus from 'http-status'
import crypto from 'crypto'
import { type RegisterDto } from './dtos/register.dto'
import { UserRepository } from '../../repository/user.repository'
import { ErrorMessage } from '../../utils/constants/error-message'
import { JwtService } from '../../utils/services/jwt/jwt.service'
import { type ResetPasswordDto } from './dtos/reset-password.dto'
import { type LoginDto } from './dtos/login.dto'
import * as bcrypt from 'bcrypt'

export class AuthService {
  private readonly logger: WinstonLogger
  private readonly jwtService: JwtService
  private readonly userRepository: UserRepository

  constructor () {
    this.logger = new WinstonLogger()
    this.jwtService = new JwtService()
    this.userRepository = new UserRepository()
  }

  async register (data: RegisterDto) {
    const { email, firstName, lastName, password } = data
    const emailExist = await this.userRepository.getByEmail(email)
    if (emailExist) {
      throw new HttpException(ErrorMessage.USER_WITH_EMAIL_ALREADY_EXISTS, HttpStatus.BAD_REQUEST)
    }
    try {
      const token = crypto.randomBytes(20).toString('hex')
      data.password = await bcrypt.hash(password, 10)
      const user = new User({ ...data, token })
      const verifyToken = this.jwtService.sign({
        email,
        token
      }, { expiresIn: '1hr' })
      const newUser = await user.save()
      // ::TODO send verification email using event emitter

      return { ...newUser.toResponse(), verifyToken }
    } catch (e) {
      this.logger.error(e.message)
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async verify (token: string) {
    let payload: { email: string, token: string }
    try {
      payload = this.jwtService.verify(token)
      const user = await this.userRepository.getByEmail(payload.email)
      if (!user) {
        throw new HttpException(ErrorMessage.INVALID_VERIFICATION_TOKEN, HttpStatus.BAD_REQUEST)
      }
      if (user.token !== payload.token) {
        throw new HttpException(ErrorMessage.INVALID_VERIFICATION_TOKEN, HttpStatus.BAD_REQUEST)
      }
      if (user.verified) {
        throw new HttpException(ErrorMessage.INVALID_VERIFICATION_TOKEN, HttpStatus.BAD_REQUEST)
      }
      user.verified = true
      user.token = crypto.randomBytes(20).toString('hex')
      await user.save()
      return user.toResponse()
    } catch (e) {
      this.logger.error(e.message)
      throw new HttpException(ErrorMessage.INVALID_VERIFICATION_TOKEN, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async requestResetPassword (email: string) {

  }

  async resetPassword (token: string, data: ResetPasswordDto) {

  }

  async login (data: LoginDto) {
    try {
      const { email, password } = data
      const user = await this.userRepository.getByEmail(email)
      if (!user) {
        throw new HttpException(ErrorMessage.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST)
      }
      if (!user.verified) {
        throw new HttpException(ErrorMessage.VERIFY_ACCOUNT, HttpStatus.BAD_REQUEST)
      }
      const isMatch = await bcrypt.compare(password, user.password)
      console.log(isMatch)
      if (!isMatch) {
        throw new HttpException(ErrorMessage.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST)
      }
      const token = this.jwtService.sign({ id: user.id }, { expiresIn: '24hr' })
      return { ...user.toResponse(), authToken: token }
    } catch (e) {
      this.logger.error(e.message)
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
