import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { productionReportService } from './productionReport.service'

const createProductionReport = catchAsync(async (req, res) => {
  const ProductionReport = await productionReportService.createProductionReport(
    req?.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Production Report successfully',
    data: ProductionReport,
  })
})
const getAllProductionReport: RequestHandler = catchAsync(async (req, res) => {
  const data = await productionReportService.getProductionReport()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Production Report successfully',

    data: data.result,
  })
})
const getToday: RequestHandler = catchAsync(async (req, res) => {
  const date: string = req?.query?.date?.toString() ?? ''
  const data = await productionReportService.getToday(date)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Today successfully',
    data,
  })
})
const getSingleProductionReport = catchAsync(async (req, res) => {
  const id = req?.params.id
  const data = await productionReportService.getSingleProductionReport(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Production Report successfully',
    data,
  })
})
const getOrderNoProductionReport = catchAsync(async (req, res) => {
  const orderNo = req?.params.orderNo
  const data = await productionReportService.getOrderNoProductionReport(orderNo)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Production Report successfully',
    data,
  })
})
const updateProductionReport = catchAsync(async (req, res) => {
  const id = req?.params.id
  const ProductionReport = await productionReportService.UpdateProductionReport(
    req?.body,
    id,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Production Report successfully',
    data: ProductionReport,
  })
})
const deleteProductionReport = catchAsync(async (req, res) => {
  const id = req?.params.id
  await productionReportService.deletedProductionReport(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Production Report successfully',
    data: null,
  })
})
export const productionReportController = {
  createProductionReport,
  getAllProductionReport,
  updateProductionReport,
  deleteProductionReport,
  getSingleProductionReport,
  getToday,
  getOrderNoProductionReport,
}
