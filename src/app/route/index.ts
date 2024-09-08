import { Router } from 'express'
import { userRouter } from '../module/user/user.route'
import { AuthRoutes } from '../module/auth/auth.route'


const router = Router()
const moduleRoutes = [
    {
        path: '/user',
        route: userRouter,
    }, {
        path: '/auth',
        route: AuthRoutes,
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router