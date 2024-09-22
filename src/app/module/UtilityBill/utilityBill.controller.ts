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
    data: data,
  })
})
const getUtility: RequestHandler = catchAsync(async (req, res) => {
  const result = await utilityService.getUtility(req?.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Data fetch successfully',
    data: result,
  })
})
const updateUtility = catchAsync(async (req, res) => {
  const id = req?.params.id
  const result = await utilityService.updateUtility(req?.body, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Data successfully',
    data: result,
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
}
