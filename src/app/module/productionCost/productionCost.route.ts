import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { productionCostController } from './productionCost.controller'
import {
  ProductionCostUpdateValidation,
  ProductionCostValidation,
} from './productionCost.validation'
const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(ProductionCostValidation),
  productionCostController.createProductionCost,
)
router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.executiveDirector,
    USER_ROLE.coordinator,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  productionCostController.getAllProductionCost,
)
router.get(
  '/today',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.executiveDirector,
    USER_ROLE.coordinator,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  productionCostController.getTodayProductionCost,
)
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.executiveDirector),
  productionCostController.getSingleProductionCost,
)
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(ProductionCostUpdateValidation),
  productionCostController.updateProductionCost,
)
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  productionCostController.deleteProductionCost,
)

export const productionCostRouter = router
