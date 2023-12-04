import jwt, { type SignOptions } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export class JwtService {
  sign (payload: Record<string, any>, options: SignOptions | undefined): string {
    return jwt.sign(payload, process.env.SECRET_KEY as string, options)
  }

  verify (token: string): any {
    return jwt.verify(token, process.env.SECRET_KEY as string)
  }
}
