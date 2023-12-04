import { type ResponseStatus } from './response.enum'

export interface IResponse {
  status: ResponseStatus
  message: string
  data: any
}
