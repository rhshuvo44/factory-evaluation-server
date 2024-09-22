import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { factoryDevelopmentController } from './factoryDevelopment.controller'
import { factoryDevelopmentUpdateValidation, factoryDevelopmentValidation } from './factoryDevelopment.validation'
const router = express.Router()

router.post(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
    validateRequest(factoryDevelopmentValidation),
    factoryDevelopmentController.createFactoryDevelopment,
)
router.get(
    '/',
    auth(
        USER_ROLE.admin,
        USER_ROLE.executiveDirector,
        USER_ROLE.coordinator,
        USER_ROLE.generalManager,
        USER_ROLE.managingDirector,
    ),
    factoryDevelopmentController.getAllFactoryDevelopment,
)
router.patch(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
    validateRequest(factoryDevelopmentUpdateValidation),
    factoryDevelopmentController.updateFactoryDevelopment,
)
export const factoryDevelopmentRouter = router
