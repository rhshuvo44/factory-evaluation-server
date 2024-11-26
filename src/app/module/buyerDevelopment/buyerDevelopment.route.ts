import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { buyerDevelopmentController } from './buyerDevelopment.controller'
import {
  buyerDevelopmentUpdateValidation,
  buyerDevelopmentValidation,
} from './buyerDevelopment.validation'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(buyerDevelopmentValidation),
  buyerDevelopmentController.createBuyerDevelopment,
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
  buyerDevelopmentController.getAllBuyerDevelopment,
)
router.get(
  '/today',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.coordinator,
    USER_ROLE.executiveDirector,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  buyerDevelopmentController.getToday,
)
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.executiveDirector),
  buyerDevelopmentController.getSingleBuyerDevelopment,
)
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(buyerDevelopmentUpdateValidation),
  buyerDevelopmentController.updateBuyerDevelopment,
)
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  buyerDevelopmentController.deleteBuyerDevelopment,
)
export const buyerDevelopmentRouter = router
