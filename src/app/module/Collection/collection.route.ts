import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import {
  collectionUpdateValidation,
  collectionValidation,
} from './collection.validation'
import { collectionController } from './collection.controller'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(collectionValidation),
  collectionController.createCollection,
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
  collectionController.getAllCollection,
)
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
  validateRequest(collectionUpdateValidation),
  collectionController.updateCollection,
)
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.executiveDirector),
  collectionController.getSingleCollection,
)
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  collectionController.deleteCollection,
)
export const collectionRouter = router
