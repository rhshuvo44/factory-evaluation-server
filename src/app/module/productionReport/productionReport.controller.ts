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
  const ProductionReport = await productionReportService.getProductionReport(
    req?.query,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Production Report successfully',
    data: ProductionReport,
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
}