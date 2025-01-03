import { Router } from 'express'
import { AuthRoutes } from '../module/auth/auth.route'
import { buyerDevelopmentRouter } from '../module/buyerDevelopment/buyerDevelopment.route'
import { collectionRouter } from '../module/Collection/collection.route'
import { employeeRouter } from '../module/employee/employee.route'
import { factoryDevelopmentRouter } from '../module/factoryDevelopment/factoryDevelopment.route'
import { fixedCostRouter } from '../module/fixedCost/fixedCost.route'
import { loanRouter } from '../module/Loan/loan.route'
import { miscellaneousRouter } from '../module/miscellaneous/miscellaneous.route'
import { notificationRouter } from '../module/notification/notification.route'
import { orderRouter } from '../module/order/order.route'
import { outputRouter } from '../module/output/output.route'
import { productionCostRouter } from '../module/productionCost/productionCost.route'
import { productionReportRouter } from '../module/productionReport/productionReport.route'
import { reportRouter } from '../module/report/report.route'
import { targetOutputRouter } from '../module/Target&Output/target&Output.route'
import { travelRouter } from '../module/travel/travel.route'
import { userRouter } from '../module/user/user.route'
import { utilityRouter } from '../module/UtilityBill/utilityBill.route'

const router = Router()
const moduleRoutes = [
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/travelling-allowance',
    route: travelRouter,
  },
  {
    path: '/miscellaneous',
    route: miscellaneousRouter,
  },
  {
    path: '/loan-return',
    route: loanRouter,
  },
  {
    path: '/factory-development',
    route: factoryDevelopmentRouter,
  },
  {
    path: '/buyer-development',
    route: buyerDevelopmentRouter,
  },
  {
    path: '/order',
    route: orderRouter,
  },
  {
    path: '/utility',
    route: utilityRouter,
  },
  {
    path: '/collection',
    route: collectionRouter,
  },
  {
    path: '/fixed-cost',
    route: fixedCostRouter,
  },
  {
    path: '/employee',
    route: employeeRouter,
  },
  {
    path: '/output',
    route: outputRouter,
  },
  {
    path: '/targets-output',
    route: targetOutputRouter,
  },
  {
    path: '/production-report',
    route: productionReportRouter,
  },
  {
    path: '/production-cost',
    route: productionCostRouter,
  },
  {
    path: '/report',
    route: reportRouter,
  },
  {
    path: '/notification',
    route: notificationRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
