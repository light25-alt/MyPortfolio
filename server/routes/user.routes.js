import { Router } from 'express'
import * as ctrl from '../controllers/user.controller.js'
import { requireSignin, requireAdmin, optionalAuth } from '../middleware/auth.js'

const router = Router()
// POST api/users is public sign up; everything else is admin only.
router.route('/api/users')
  .post(optionalAuth, ctrl.create)
  .get(requireSignin, requireAdmin, ctrl.list)
  .delete(requireSignin, requireAdmin, ctrl.removeAll)
router.route('/api/users/:id')
  .get(requireSignin, requireAdmin, ctrl.read)
  .put(requireSignin, requireAdmin, ctrl.update)
  .delete(requireSignin, requireAdmin, ctrl.remove)

export default router
