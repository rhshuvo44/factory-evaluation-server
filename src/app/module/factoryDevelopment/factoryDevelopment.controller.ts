import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { factoryDevelopmentService } from './factoryDevelopment.service'

const createFactoryDevelopment = catchAsync(async (req, res) => {
  const data = await factoryDevelopmentService.createFactoryDevelopment(
    req?.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create data successfully',
    data,
  })
})

const getAllFactoryDevelopment: RequestHandler = catchAsync(
  async (req, res) => {
    const data = await factoryDevelopmentService.getFactoryDevelopment(
      req?.query,
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Data fetch successfully',
      meta: data.meta,
      totalPrice: data.totalPrice,
      data: data.result,
    })
  },
)
const getToday: RequestHandler = catchAsync(async (req, res) => {
  const data = await factoryDevelopmentService.getToday()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Today successfully',
    data,
  })
})
const getSingleFactoryDevelopment = catchAsync(async (req, res) => {
  const id = req?.params.id
  const data = await factoryDevelopmentService.getSingleFactoryDevelopment(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Data successfully',
    data,
  })
})
const updateFactoryDevelopment = catchAsync(async (req, res) => {
  const id = req?.params.id
  const data = await factoryDevelopmentService.updateFactoryDevelopment(
    req?.body,
    id,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Data successfully',
    data,
  })
})
const deleteFactoryDevelopment = catchAsync(async (req, res) => {
  const id = req?.params.id
  await factoryDevelopmentService.deletedFactoryDevelopment(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted data successfully',
    data: null,
  })
})
export const factoryDevelopmentController = {
  createFactoryDevelopment,
  getAllFactoryDevelopment,
  updateFactoryDevelopment,
  deleteFactoryDevelopment,
  getSingleFactoryDevelopment,
  getToday,
}
