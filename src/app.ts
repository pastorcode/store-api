/* Required Modules */
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import router from './routes'
import { errorMiddleware } from './middleware/error.middleware'

const app = express()

/* App Configuration */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: '*' }))

/* Routes */
app.get('/', (req, res) => {
  res.json('Welcome to Token Based Authentication API')
})
app.use('/api/v1', router)
app.use(errorMiddleware)

export default app
