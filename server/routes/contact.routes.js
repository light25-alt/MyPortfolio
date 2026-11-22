import { Router } from 'express'
import ctrl from '../controllers/contact.controller.js'
import { requireSignin, requireAdmin } from '../middleware/auth.js'

const router = Router()
// Anyone may send a contact message; only admins can read, edit or delete them.
router.route('/api/contacts')
  .post(ctrl.create)
  .get(requireSignin, requireAdmin, ctrl.list)
  .delete(requireSignin, requireAdmin, ctrl.removeAll)
router.route('/api/contacts/:id')
  .get(requireSignin, requireAdmin, ctrl.read)
  .put(requireSignin, requireAdmin, ctrl.update)
  .delete(requireSignin, requireAdmin, ctrl.remove)

export default router
