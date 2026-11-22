import { Router } from 'express'
import ctrl from '../controllers/project.controller.js'
import { requireSignin, requireAdmin } from '../middleware/auth.js'

const router = Router()
// Reading is public (the portfolio pages show it); writing is admin only.
router.route('/api/projects')
  .get(ctrl.list)
  .post(requireSignin, requireAdmin, ctrl.create)
  .delete(requireSignin, requireAdmin, ctrl.removeAll)
router.route('/api/projects/:id')
  .get(ctrl.read)
  .put(requireSignin, requireAdmin, ctrl.update)
  .delete(requireSignin, requireAdmin, ctrl.remove)

export default router
