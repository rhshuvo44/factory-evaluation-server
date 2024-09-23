import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { employeeController } from './employee.controller'
import {
  employeeUpdateValidation,
  employeeValidation,
} from './employee.validation'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(employeeValidation),
  employeeController.createEmployee,
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
  employeeController.getAllEmployee,
)
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(employeeUpdateValidation),
  employeeController.updateEmployee,
)
router.delete('/:id', auth(USER_ROLE.admin), employeeController.deleteEmployee)
export const employeeRouter = router
