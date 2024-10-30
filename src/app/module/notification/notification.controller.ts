import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { notificationService } from './notification.service'

const createNotification = catchAsync(async (req, res) => {
  const data = await notificationService.createNotification(req?.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Notification successfully',
    data,
  })
})
const getAllNotification: RequestHandler = catchAsync(async (req, res) => {
  const data = await notificationService.getNotification()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Data fetch successfully',

    data: data.result,
  })
})

export const notificationController = {
  createNotification,
  getAllNotification,
}
