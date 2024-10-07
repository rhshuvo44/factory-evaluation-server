import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
// import { upload } from '../../utils/sendImageToCloudinary'
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
  // upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req.body.data)
  //   next()
  // },
  validateRequest(employeeValidation),
  employeeController.createEmployee,
)
router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.coordinator,
    USER_ROLE.executiveDirector,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  employeeController.getAllEmployee,
)
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.executiveDirector),

  employeeController.getSingleEmployee,
)
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(employeeUpdateValidation),
  employeeController.updateEmployee,
)
router.delete('/:id', auth(USER_ROLE.admin), employeeController.deleteEmployee)
export const employeeRouter = router
