import { type NextFunction, type Request, type RequestHandler, type Response } from 'express'
import { plainToInstance } from 'class-transformer'
import { validate, type ValidationError } from 'class-validator'
import HttpException from '../utils/http-exception'
import HttpStatus from 'http-status'

export function validateBody (dtoType: any): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors = await validate(plainToInstance(dtoType, req.body))
    if (errors.length > 0) {
      const message = errors
        .map((error: ValidationError) =>
          Object.values(error.constraints || '')?.join(', ')
        )
        .filter(Boolean)
        .join(', ')
      next(new HttpException(message, HttpStatus.BAD_REQUEST))
    } else {
      next()
    }
  }
}
