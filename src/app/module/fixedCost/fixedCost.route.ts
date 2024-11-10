import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { fixedCostController } from './fixedCost.controller'
import { fixedCostSchema, fixedCostUpdateSchema } from './fixedCost.validation'
const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(fixedCostSchema),
  fixedCostController.createFixedCost,
)
router.get(
  '/',
  auth(
    USER_ROLE.superAdmin, USER_ROLE.admin,
    USER_ROLE.coordinator,
    USER_ROLE.executiveDirector,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  fixedCostController.getFixedCost,
)
router.get(
  '/today',
  auth(
    USER_ROLE.superAdmin, USER_ROLE.admin,
    USER_ROLE.coordinator,
    USER_ROLE.executiveDirector,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  fixedCostController.getToday,
)
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  fixedCostController.getSingleFixedCost,
)
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(fixedCostUpdateSchema),
  fixedCostController.updateFixedCost,
)
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  fixedCostController.deletedFixedCost,
)

export const fixedCostRouter = router
