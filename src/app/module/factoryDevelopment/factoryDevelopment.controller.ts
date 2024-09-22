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
    data: data,
  })
})

const getAllFactoryDevelopment: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await factoryDevelopmentService.getFactoryDevelopment(
      req?.query,
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Data fetch successfully',
      data: result,
    })
  },
)
const updateFactoryDevelopment = catchAsync(async (req, res) => {
  const id = req?.params.id
  const result = await factoryDevelopmentService.updateFactoryDevelopment(
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
  deleteFactoryDevelopment
}
