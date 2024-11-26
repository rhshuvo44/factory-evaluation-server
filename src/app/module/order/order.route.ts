import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { orderController } from './order.controller'
import { orderUpdateValidation, orderValidation } from './order.validation'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.coordinator),
  validateRequest(orderValidation),
  orderController.createOrder,
)
router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.coordinator,
    USER_ROLE.executiveDirector,
    USER_ROLE.generalDirector,
    USER_ROLE.managingDirector,
  ),
  orderController.getAllOrder,
)
// router.get(
//   '/today',
//   auth(
//     USER_ROLE.superAdmin,
//     USER_ROLE.admin,
//     USER_ROLE.coordinator,
//     USER_ROLE.executiveDirector,
//     USER_ROLE.generalDirector,
//     USER_ROLE.managingDirector,
//   ),
//   orderController.getToday,
// )
router.get(
  '/orderNumber',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.coordinator),
  orderController.getOrderNumber,
)
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.coordinator),
  validateRequest(orderUpdateValidation),
  orderController.updateOrder,
)
router.get(
  '/:orderNo',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.coordinator),
  orderController.getSingleOrder,
)

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  orderController.deleteOrder,
)
export const orderRouter = router
