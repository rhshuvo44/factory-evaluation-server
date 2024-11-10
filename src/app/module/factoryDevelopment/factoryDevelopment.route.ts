import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { factoryDevelopmentController } from './factoryDevelopment.controller'
import {
  factoryDevelopmentUpdateValidation,
  factoryDevelopmentValidation,
} from './factoryDevelopment.validation'
const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(factoryDevelopmentValidation),
  factoryDevelopmentController.createFactoryDevelopment,
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
  factoryDevelopmentController.getAllFactoryDevelopment,
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
  factoryDevelopmentController.getToday,
)
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.executiveDirector),
  factoryDevelopmentController.getSingleFactoryDevelopment,
)
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(factoryDevelopmentUpdateValidation),
  factoryDevelopmentController.updateFactoryDevelopment,
)
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  factoryDevelopmentController.deleteFactoryDevelopment,
)
export const factoryDevelopmentRouter = router
