import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { loanController } from './loan.controller'
import { loanUpdateValidation, loanValidation } from './loan.validation'
const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(loanValidation),
  loanController.createLoan,
)
router.get(
  '/',
  auth(
    USER_ROLE.superAdmin, USER_ROLE.admin,
    USER_ROLE.coordinator,
    USER_ROLE.executiveDirector,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  loanController.getAllLoan,
)
router.get(
  '/today',
  auth(
    USER_ROLE.superAdmin, USER_ROLE.admin,
    USER_ROLE.coordinator,
    USER_ROLE.executiveDirector,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  loanController.getToday,
)
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.executiveDirector),
  loanController.getSingleLoan,
)
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(loanUpdateValidation),
  loanController.updateLoan,
)
router.delete('/:id', auth(USER_ROLE.superAdmin, USER_ROLE.admin), loanController.deleteLoan)

export const loanRouter = router
