import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { outputController } from './output.controller'
import { outputValidation } from './output.validation'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.coordinator),
  validateRequest(outputValidation),
  outputController.createOutput,
)
router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.coordinator,
    USER_ROLE.executiveDirector,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  outputController.getAllOutput,
)
router.get(
  '/production-reports/download',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.coordinator,
    USER_ROLE.executiveDirector,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  outputController.getAllOutputDownload,
)

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  outputController.deleteOutput,
)
export const outputRouter = router
