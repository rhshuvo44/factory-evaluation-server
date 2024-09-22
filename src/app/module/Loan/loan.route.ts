import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { loanController } from './loan.controller'
import { loanValidation } from './loan.validation'
const router = express.Router()

router.post(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
    validateRequest(loanValidation),
    loanController.createLoan,
)




export const loanRouter = router
