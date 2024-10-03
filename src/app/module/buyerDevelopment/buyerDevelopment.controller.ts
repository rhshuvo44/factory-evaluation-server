import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { buyerDevelopmentService } from './buyerDevelopment.service'

const createBuyerDevelopment = catchAsync(async (req, res) => {
  const data = await buyerDevelopmentService.createBuyerDevelopment(req?.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create data successfully',
    data: data,
  })
})

const getAllBuyerDevelopment: RequestHandler = catchAsync(async (req, res) => {
  const result = await buyerDevelopmentService.getBuyerDevelopment(req?.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Data fetch successfully',
    data: result,
  })
})
const getToday: RequestHandler = catchAsync(async (req, res) => {
  const data = await buyerDevelopmentService.getToday()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Today successfully',
    data,
  })
})
const updateBuyerDevelopment = catchAsync(async (req, res) => {
  const id = req?.params.id
  const result = await buyerDevelopmentService.updateBuyerDevelopment(
    req?.body,
    id,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Data successfully',
    data: result,
  })
})
const getSingleBuyerDevelopment = catchAsync(async (req, res) => {
  const id = req?.params.id
  const result = await buyerDevelopmentService.getSingleBuyerDevelopment(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Single Data successfully',
    data: result,
  })
})
const deleteBuyerDevelopment = catchAsync(async (req, res) => {
  const id = req?.params.id
  await buyerDevelopmentService.deletedBuyerDevelopment(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted data successfully',
    data: null,
  })
})
export const buyerDevelopmentController = {
  createBuyerDevelopment,
  getAllBuyerDevelopment,
  updateBuyerDevelopment,
  deleteBuyerDevelopment,
  getSingleBuyerDevelopment,
  getToday,
}
