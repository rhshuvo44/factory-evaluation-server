import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { miscellaneousController } from './miscellaneous.controller'
import {
  miscellaneousUpdateValidation,
  miscellaneousValidation,
} from './miscellaneous.validation'
const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(miscellaneousValidation),
  miscellaneousController.createMiscellaneous,
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
  miscellaneousController.getAllMiscellaneous,
)

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.executiveDirector),

  miscellaneousController.getSingleMiscellaneous,
)
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(miscellaneousUpdateValidation),
  miscellaneousController.updateMiscellaneous,
)
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  miscellaneousController.deleteMiscellaneous,
)
export const miscellaneousRouter = router
