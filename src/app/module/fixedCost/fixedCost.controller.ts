import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { fixedCostService } from './fixedCost.service'

const createFixedCost = catchAsync(async (req, res) => {
  const data = await fixedCostService.createFixedCost(req?.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create data successfully',
    data: data,
  })
})
const getFixedCost: RequestHandler = catchAsync(async (req, res) => {
  const result = await fixedCostService.getFixedCost(req?.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Data fetch successfully',
    data: result,
  })
})
const updateFixedCost = catchAsync(async (req, res) => {
  const id = req?.params.id
  const result = await fixedCostService.updateFixedCost(req?.body, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Data successfully',
    data: result,
  })
})
const deletedFixedCost = catchAsync(async (req, res) => {
  const id = req?.params.id
  await fixedCostService.deletedFixedCost(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Data successfully',
    data: null,
  })
})
export const fixedCostController = {
  createFixedCost,
  getFixedCost,
  updateFixedCost,
  deletedFixedCost,
}
