import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { orderService } from './order.service'

const createOrder = catchAsync(async (req, res) => {
  const data = await orderService.createOrder(req?.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create data successfully',
    data: data,
  })
})

const getAllOrder: RequestHandler = catchAsync(async (req, res) => {
  const data = await orderService.getOrder()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Data fetch successfully',
    data,
  })
})
// const getToday = catchAsync(async (req, res) => {
//   const date: string = req?.query?.date?.toString() ?? ''
//   const data = await orderService.getToday(date)

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Get Today successfully',
//     data,
//   })
// })
const updateOrder = catchAsync(async (req, res) => {
  const id = req?.params.id
  const result = await orderService.updateOrder(req?.body, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Data successfully',
    data: result,
  })
})
const getSingleOrder = catchAsync(async (req, res) => {
  const orderNo = req?.params.orderNo
  const result = await orderService.getSingleOrder(orderNo)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Single Data successfully',
    data: result,
  })
})
const getOrderNumber = catchAsync(async (req, res) => {
  const data = await orderService.getOrderNumber()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get All OrderNo successfully',
    data,
  })
})
const deleteOrder = catchAsync(async (req, res) => {
  const id = req?.params.id
  await orderService.deletedOrder(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted data successfully',
    data: null,
  })
})
export const orderController = {
  createOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
  getSingleOrder,
  getOrderNumber,
  // getToday,
}
