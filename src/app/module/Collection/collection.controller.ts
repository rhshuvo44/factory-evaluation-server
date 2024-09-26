import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { collectionService } from './collection.service'

const createCollection = catchAsync(async (req, res) => {
  const data = await collectionService.createCollection(req?.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create data successfully',
    data,
  })
})

const getAllCollection: RequestHandler = catchAsync(async (req, res) => {
  const data = await collectionService.getCollection(req?.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Data fetch successfully',
    data,
  })
})
const getSingleCollection = catchAsync(async (req, res) => {
  const id = req?.params.id
  const data = await collectionService.getSingleCollection(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Data successfully',
    data,
  })
})
const updateCollection = catchAsync(async (req, res) => {
  const id = req?.params.id
  const result = await collectionService.updateCollection(req?.body, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Data successfully',
    data: result,
  })
})
const deleteCollection = catchAsync(async (req, res) => {
  const id = req?.params.id
  await collectionService.deletedCollection(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted data successfully',
    data: null,
  })
})
export const collectionController = {
  createCollection,
  getAllCollection,
  updateCollection,
  deleteCollection,
  getSingleCollection,
}
