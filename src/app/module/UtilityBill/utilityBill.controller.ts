import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { utilityService } from './utilityBill.service'
import { RequestHandler } from 'express'

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
export const utilityController = {
  createUtility,
  getUtility
}
