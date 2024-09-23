import { Router } from 'express'
import { AuthRoutes } from '../module/auth/auth.route'
import { buyerDevelopmentRouter } from '../module/buyerDevelopment/buyerDevelopment.route'
import { collectionRouter } from '../module/Collection/collection.route'
import { factoryDevelopmentRouter } from '../module/factoryDevelopment/factoryDevelopment.route'
import { loanRouter } from '../module/Loan/loan.route'
import { miscellaneousRouter } from '../module/miscellaneous/miscellaneous.route'
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
    path: '/utility',
    route: utilityRouter,
  },
  {
    path: '/collection',
    route: collectionRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
