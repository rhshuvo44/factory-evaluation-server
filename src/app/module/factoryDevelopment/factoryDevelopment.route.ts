import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { factoryDevelopmentController } from './factoryDevelopment.controller'
import { factoryDevelopmentValidation } from './factoryDevelopment.validation'
const router = express.Router()

router.post(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
    validateRequest(factoryDevelopmentValidation),
    factoryDevelopmentController.createFactoryDevelopment,
)


export const factoryDevelopmentRouter = router
