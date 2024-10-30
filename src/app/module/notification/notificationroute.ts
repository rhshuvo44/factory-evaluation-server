import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { notificationValidation } from './notification.validation'
import { notificationController } from './notification.controller'
const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.executiveDirector, USER_ROLE.coordinator),
  validateRequest(notificationValidation),
  notificationController.createNotification,
)
router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.coordinator,
    USER_ROLE.executiveDirector,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  notificationController.getAllNotification,
)

export const notificationRouter = router
