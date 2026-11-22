import { Router } from 'express'
import * as ctrl from '../controllers/auth.controller.js'

const router = Router()
router.post('/auth/signin', ctrl.signin)
router.get('/auth/signout', ctrl.signout)

export default router
