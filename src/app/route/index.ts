import { Router } from 'express'
import { userRouter } from '../module/user/user.route'


const router = Router()
const moduleRoutes = [
    {
        path: '/auth',
        route: userRouter,
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router