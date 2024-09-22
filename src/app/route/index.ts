import { Router } from 'express'
import { AuthRoutes } from '../module/auth/auth.route'
import { loanRouter } from '../module/Loan/loan.route'
import { miscellaneousRouter } from '../module/miscellaneous/miscellaneous.route'
import { travelRouter } from '../module/travel/travel.route'
import { userRouter } from '../module/user/user.route'

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
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
