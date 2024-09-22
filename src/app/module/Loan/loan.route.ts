import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { loanController } from './loan.controller'
import { loanUpdateValidation, loanValidation } from './loan.validation'
const router = express.Router()

router.post(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
    validateRequest(loanValidation),
    loanController.createLoan,
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
    loanController.getAllLoan,
)
router.patch(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
    validateRequest(loanUpdateValidation),
    loanController.updateLoan,
)

export const loanRouter = router
