import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { targetOutputService } from './target&Output.service'

const createTargetOutput = catchAsync(async (req, res) => {
  const data = await targetOutputService.createTargetOutput(req?.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create  successfully',
    data,
  })
})
const getAllTargetOutput: RequestHandler = catchAsync(async (req, res) => {
  const data = await targetOutputService.getTargetOutput(req?.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All successfully',
    meta: data.meta,
    data: data.result,
  })
})
const getToday: RequestHandler = catchAsync(async (req, res) => {
  const data = await targetOutputService.getToday()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Today successfully',
    data,
  })
})
const getSingleTargetOutput = catchAsync(async (req, res) => {
  const id = req?.params.id
  const data = await targetOutputService.getSingleTargetOutput(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single successfully',
    data,
  })
})
const updateTargetOutput = catchAsync(async (req, res) => {
  const id = req?.params.id
  const targetOutput = await targetOutputService.UpdateTargetOutput(
    req?.body,
    id,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update successfully',
    data: targetOutput,
  })
})
const deleteTargetOutput = catchAsync(async (req, res) => {
  const id = req?.params.id
  await targetOutputService.deletedTargetOutput(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted successfully',
    data: null,
  })
})
export const targetOutputController = {
  createTargetOutput,
  getAllTargetOutput,
  updateTargetOutput,
  deleteTargetOutput,
  getSingleTargetOutput,
  getToday,
}
