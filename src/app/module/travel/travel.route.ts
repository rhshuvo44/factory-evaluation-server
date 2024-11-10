import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { travelController } from './travel.controller'
import { travelUpdateValidation, travelValidation } from './travel.validation'
const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(travelValidation),
  travelController.createTravellingAllowance,
)
router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,USER_ROLE.admin,
    USER_ROLE.executiveDirector,
    USER_ROLE.coordinator,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  travelController.getAllTravellingAllowance,
)
router.get(
  '/today',
  auth(
    USER_ROLE.superAdmin,USER_ROLE.admin,
    USER_ROLE.executiveDirector,
    USER_ROLE.coordinator,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  travelController.getTodayTravellingAllowance,
)
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin, USER_ROLE.executiveDirector),
  travelController.getSingleTravellingAllowance,
)
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(travelUpdateValidation),
  travelController.updateTravellingAllowance,
)
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin),
  travelController.deleteTravellingAllowance,
)

export const travelRouter = router
