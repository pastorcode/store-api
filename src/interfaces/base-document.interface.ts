import { type Document } from 'mongoose'

export interface BaseDocument extends Document {
  deleted: boolean
}
