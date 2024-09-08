import { Router } from 'express'
import { userRouter } from '../module/user/user.route'
import { AuthRoutes } from '../module/auth/auth.route'
import { travelRouter } from '../module/travel/travel.route'

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
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
