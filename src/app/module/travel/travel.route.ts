import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { travelController } from './travel.controller'
import { travelValidation } from './travel.validation'
const router = express.Router()

router.post(
    '/', auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
    validateRequest(travelValidation),
    travelController.createTravellingAllowance,
)
router.get('/', auth(USER_ROLE.admin, USER_ROLE.executiveDirector, USER_ROLE.coordinator, USER_ROLE.generalManager, USER_ROLE.managingDirector), travelController.getAllTravellingAllowance)

export const travelRouter = router
