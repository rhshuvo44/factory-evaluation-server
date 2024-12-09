import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { generateExcel } from '../../utils/generateCSV'
import sendResponse from '../../utils/sendResponse'
import { outputService } from './output.service'

const createOutput = catchAsync(async (req, res) => {
  const data = await outputService.createOutput(req?.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create  successfully',
    data,
  })
})
const getAllOutput: RequestHandler = catchAsync(async (req, res) => {
  const data = await outputService.getOutput()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All successfully',
    data: data,
  })
})
const getAllOutputDownload: RequestHandler = catchAsync(async (req, res) => {
  const data = await outputService.getAllOutputDownload()
  // Generate CSV
  // const csvStream = generateExcel(data);

  // // Set headers for CSV download
  // res.setHeader('Content-Disposition', `attachment; filename="production-report.csv"`);
  // res.setHeader('Content-Type', 'text/csv');

  // // Pipe CSV stream to the response
  // csvStream.pipe(res);

  // Generate Excel file
  const excelBuffer = generateExcel(data, 'production-report')

  // Set headers to download the file
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="production-report.xlsx"',
  )
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )

  // Send the Excel file as a buffer
  res.send(excelBuffer)

  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'Production Report download successfully',
  //   data,
  // })
})

const deleteOutput = catchAsync(async (req, res) => {
  const id = req?.params.id
  await outputService.deletedOutput(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted successfully',
    data: null,
  })
})
export const outputController = {
  createOutput,
  getAllOutput,
  deleteOutput,
  getAllOutputDownload,
}
