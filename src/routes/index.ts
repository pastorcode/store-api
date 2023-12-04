import { Router } from 'express'

import auth from '../client/auth/auth.route'

const router = Router()

router.use('/auth', auth)

export default router
