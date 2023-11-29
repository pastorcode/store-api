import {Router} from "express";

const router = Router();

import auth from '../client/auth/auth.route';

router.use('/auth', auth);

export default router;