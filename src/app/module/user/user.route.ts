import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { userCreateValidationSchema } from './user.validation'
import { userController } from './user.controller'
const router = express.Router()

router.post(
    '/create-user', validateRequest(userCreateValidationSchema),userController.signup
)


export const userRouter = router