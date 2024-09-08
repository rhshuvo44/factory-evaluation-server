import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { userCreateValidationSchema } from './user.validation'
import { userController } from './user.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'
const router = express.Router()

router.post(
  '/create-user',
  validateRequest(userCreateValidationSchema),
  userController.signup,
)
router.get('/', auth(USER_ROLE.admin), userController.allUser)
router.post('/logout', userController.logout)

export const userRouter = router
