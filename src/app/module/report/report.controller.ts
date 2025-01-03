import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { generateExcel } from '../../utils/generateCSV'
import sendResponse from '../../utils/sendResponse'
import { reportService } from './report.service'

const createReport = catchAsync(async (req, res) => {
  const data = await reportService.createReport(req?.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create data successfully',
    data,
  })
})
const getReport: RequestHandler = catchAsync(async (req, res) => {
  const data = await reportService.getReport(req?.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Data fetch successfully',
    meta: data.meta,
    data: data.result,
    totalPrice: data.totalPrice,
  })
})
const getAllReportDownload: RequestHandler = catchAsync(async (req, res) => {
  const data = await reportService.getAllReportDownload()

  // Generate Excel file
  const excelBuffer = generateExcel(data, 'report')

  // Set headers to download the file
  res.setHeader('Content-Disposition', 'attachment; filename="report.xlsx"')
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )

  // Send the Excel file as a buffer
  res.send(excelBuffer)
})
const deleteReport = catchAsync(async (req, res) => {
  const id = req?.params.id
  await reportService.deletedReport(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Report successfully',
    data: null,
  })
})
export const reportController = {
  createReport,
  getReport,
  deleteReport,
  getAllReportDownload,
}
