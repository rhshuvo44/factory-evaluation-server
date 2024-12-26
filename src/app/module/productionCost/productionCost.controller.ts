import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { productionCostService } from './productionCost.service'
const createProductionCost = catchAsync(async (req, res) => {
  const data = await productionCostService.createProductionCost(req?.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Production Cost successfully',
    data,
  })
})
const getAllProductionCost: RequestHandler = catchAsync(async (req, res) => {
  const data = await productionCostService.getProductionCost()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Production Cost successfully',

    totalPrice: data.totalPrice,
    data: data.result,
  })
})
const getTodayProductionCost: RequestHandler = catchAsync(async (req, res) => {
  const date: string = req?.query?.date?.toString() ?? ''
  const data = await productionCostService.getTodayProductionCost(date)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Today Production Cost successfully',
    data,
  })
})
const getSingleProductionCost: RequestHandler = catchAsync(async (req, res) => {
  const id: string = req?.params.id
  const data = await productionCostService.getSingleProductionCost(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Production Cost successfully',
    data,
  })
})
const updateProductionCost = catchAsync(async (req, res) => {
  const id: string = req?.params.id
  const data = await productionCostService.UpdateProductionCost(req?.body, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Production Cost successfully',
    data,
  })
})
const deleteProductionCost = catchAsync(async (req, res) => {
  const id = req?.params.id
  await productionCostService.deletedProductionCost(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Production Cost successfully',
    data: null,
  })
})
export const productionCostController = {
  createProductionCost,
  getAllProductionCost,
  updateProductionCost,
  deleteProductionCost,
  getSingleProductionCost,
  getTodayProductionCost,
}
