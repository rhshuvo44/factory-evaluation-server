import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
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
}
