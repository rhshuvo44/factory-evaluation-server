import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from './user.constant'
import { userController } from './user.controller'
import {
  userCreateValidationSchema,
  userUpdateValidationSchema,
} from './user.validation'
const router = express.Router()

router.post(
  '/create-user',
  auth(USER_ROLE.admin),
  validateRequest(userCreateValidationSchema),
  userController.signup,
)
router.get('/', auth(USER_ROLE.admin), userController.allUser)
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(userUpdateValidationSchema),
  userController.userUpdate,
)
router.delete('/:id', auth(USER_ROLE.admin), userController.userDelete)
router.post('/logout', userController.logout)
router.get(
  '/me',
  auth(
    USER_ROLE.admin,
    USER_ROLE.coordinator,
    USER_ROLE.executiveDirector,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  userController.getMe,
)

export const userRouter = router
