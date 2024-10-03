import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { productionReportController } from './productionReport.controller'
import {
  productionReportUpdateValidation,
  productionReportValidation,
} from './productionReport.validation'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.coordinator),
  validateRequest(productionReportValidation),
  productionReportController.createProductionReport,
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
  productionReportController.getAllProductionReport,
)
router.get(
  '/today',
  auth(
    USER_ROLE.admin,
    USER_ROLE.coordinator,
    USER_ROLE.executiveDirector,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  productionReportController.getToday,
)

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.coordinator),
  productionReportController.getSingleProductionReport,
)
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.coordinator),
  validateRequest(productionReportUpdateValidation),
  productionReportController.updateProductionReport,
)
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  productionReportController.deleteProductionReport,
)
export const productionReportRouter = router
