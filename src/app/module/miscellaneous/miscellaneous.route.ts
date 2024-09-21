import express from 'express'
import auth from "../../middlewares/auth"
import validateRequest from "../../middlewares/validateRequest"
import { USER_ROLE } from "../user/user.constant"
import { miscellaneousController } from './miscellaneous.controller'
import { miscellaneousValidation } from './miscellaneous.validation'
const router = express.Router()

router.post(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
    validateRequest(miscellaneousValidation),
    miscellaneousController.createMiscellaneous,
)


export const miscellaneousRouter = router