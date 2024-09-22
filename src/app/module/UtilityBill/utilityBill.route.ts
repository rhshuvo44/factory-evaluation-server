import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { utilityController } from './utilityBill.controller'
import { utilitySchema } from './utilityBill.validation'
const router = express.Router()

router.post(
    '/',
    auth(USER_ROLE.admin),
    validateRequest(utilitySchema),
    utilityController.createUtility
)


export const utilityRouter = router
