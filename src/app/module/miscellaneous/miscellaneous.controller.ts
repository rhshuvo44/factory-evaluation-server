import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { miscellaneousService } from './miscellaneous.service'

const createMiscellaneous = catchAsync(async (req, res) => {
  const miscellaneous = await miscellaneousService.createMiscellaneous(
    req?.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Miscellaneous successfully',
    data: miscellaneous,
  })
})
const getAllMiscellaneous: RequestHandler = catchAsync(async (req, res) => {
  const data = await miscellaneousService.getMiscellaneous(req?.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Miscellaneous successfully',
    meta: data.meta,
    totalPrice: data.totalPrice,
    data: data.result,
  })
})
const getToday: RequestHandler = catchAsync(async (req, res) => {
  const data = await miscellaneousService.getToday()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Today successfully',
    data,
  })
})
const getSingleMiscellaneous = catchAsync(async (req, res) => {
  const id = req?.params.id
  const data = await miscellaneousService.getSingleMiscellaneous(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Single Miscellaneous successfully',
    data,
  })
})
const updateMiscellaneous = catchAsync(async (req, res) => {
  const id = req?.params.id
  const miscellaneous = await miscellaneousService.UpdateMiscellaneous(
    req?.body,
    id,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Miscellaneous successfully',
    data: miscellaneous,
  })
})
const deleteMiscellaneous = catchAsync(async (req, res) => {
  const id = req?.params.id
  await miscellaneousService.deletedMiscellaneous(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Miscellaneous successfully',
    data: null,
  })
})
export const miscellaneousController = {
  createMiscellaneous,
  getAllMiscellaneous,
  updateMiscellaneous,
  deleteMiscellaneous,
  getSingleMiscellaneous,
  getToday,
}
