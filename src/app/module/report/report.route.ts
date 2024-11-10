import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { reportController } from './report.controller'
import { reportSchema } from './report.validation'
const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(reportSchema),
  reportController.createReport,
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
  reportController.getReport,
)
router.delete('/:id', auth(USER_ROLE.superAdmin, USER_ROLE.admin), reportController.deleteReport)
export const reportRouter = router
