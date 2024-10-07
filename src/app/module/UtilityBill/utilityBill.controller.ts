import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { utilityService } from './utilityBill.service'

const createUtility = catchAsync(async (req, res) => {
  const data = await utilityService.createUtility(req?.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create data successfully',
    data,
  })
})
const getUtility: RequestHandler = catchAsync(async (req, res) => {
  const data = await utilityService.getUtility(req?.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Data fetch successfully',
    data,
  })
})
const getToday: RequestHandler = catchAsync(async (req, res) => {
  const data = await utilityService.getToday()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Today All Data fetch successfully',
    data,
  })
})
const getSingleUtility = catchAsync(async (req, res) => {
  const id = req?.params.id
  const data = await utilityService.getSingleUtility(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Data successfully',
    data,
  })
})
const updateUtility = catchAsync(async (req, res) => {
  const id = req?.params.id
  const data = await utilityService.updateUtility(req?.body, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Data successfully',
    data,
  })
})
const deletedUtility = catchAsync(async (req, res) => {
  const id = req?.params.id
  await utilityService.deletedUtility(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Data successfully',
    data: null,
  })
})
export const utilityController = {
  createUtility,
  getUtility,
  updateUtility,
  deletedUtility,
  getSingleUtility,
  getToday,
}
