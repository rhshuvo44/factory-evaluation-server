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
router.get(
    '/',
    auth(
        USER_ROLE.admin,
        USER_ROLE.executiveDirector,
        USER_ROLE.coordinator,
        USER_ROLE.generalManager,
        USER_ROLE.managingDirector,
    ),
    miscellaneousController.getAllMiscellaneous,
)


export const miscellaneousRouter = router
