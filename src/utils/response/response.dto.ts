import { type IResponse } from './response.interface'
import { type ResponseStatus } from './response.enum'

export class ResponseDto implements IResponse {
  status: ResponseStatus
  message: string
  data: any
  constructor (status: ResponseStatus, message: string, data: any = null) {
    this.status = status
    this.message = message
    this.data = data
  }
}
