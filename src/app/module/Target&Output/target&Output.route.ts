import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { targetOutputController } from './target&Output.controller'
import {
  targetOutputUpdateValidation,
  targetOutputValidation,
} from './target&Output.validation'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.coordinator),
  validateRequest(targetOutputValidation),
  targetOutputController.createTargetOutput,
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
  targetOutputController.getAllTargetOutput,
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
  targetOutputController.getToday,
)

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.coordinator),
  targetOutputController.getSingleTargetOutput,
)
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.coordinator),
  validateRequest(targetOutputUpdateValidation),
  targetOutputController.updateTargetOutput,
)
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  targetOutputController.deleteTargetOutput,
)
export const targetOutputRouter = router
