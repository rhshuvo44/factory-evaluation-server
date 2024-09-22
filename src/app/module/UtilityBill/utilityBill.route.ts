import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { utilityController } from './utilityBill.controller'
import { utilitySchema, utilityUpdateSchema } from './utilityBill.validation'
const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(utilitySchema),
  utilityController.createUtility,
)
router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.executiveDirector,
    USER_ROLE.coordinator,
    USER_ROLE.generalManager,
    USER_ROLE.managingDirector,
  ),
  utilityController.getUtility,
)
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(utilityUpdateSchema),
  utilityController.updateUtility,
)
router.delete('/:id', auth(USER_ROLE.admin), utilityController.deletedUtility)

export const utilityRouter = router
