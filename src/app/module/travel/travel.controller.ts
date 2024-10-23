import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TravelService } from './travel.service'
const createTravellingAllowance = catchAsync(async (req, res) => {
  const data = await TravelService.createTravelAllowance(req?.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Travelling Allowance successfully',
    data,
  })
})
const getAllTravellingAllowance: RequestHandler = catchAsync(
  async (req, res) => {
    const data = await TravelService.getTravelAllowance(req?.query)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Travelling Allowance successfully',
      meta: data.meta,
      totalPrice: data.totalPrice,
      data: data.result,
    })
  },
)
const getTodayTravellingAllowance: RequestHandler = catchAsync(
  async (req, res) => {
    const date: string = req?.query?.date?.toString() ?? '';
    const data = await TravelService.getTodayTravellingAllowance(date)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Today Travelling Allowance successfully',
      data,
    })
  },
)
const getSingleTravellingAllowance: RequestHandler = catchAsync(
  async (req, res) => {
    const id: string = req?.params.id
    const data = await TravelService.getSingleTravelAllowance(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Travelling Allowance successfully',
      data,
    })
  },
)
const updateTravellingAllowance = catchAsync(async (req, res) => {
  const id: string = req?.params.id
  const data = await TravelService.UpdateTravelAllowance(req?.body, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Travelling Allowance successfully',
    data,
  })
})
const deleteTravellingAllowance = catchAsync(async (req, res) => {
  const id = req?.params.id
  await TravelService.deletedTravelAllowance(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Travelling Allowance successfully',
    data: null,
  })
})
export const travelController = {
  createTravellingAllowance,
  getAllTravellingAllowance,
  updateTravellingAllowance,
  deleteTravellingAllowance,
  getSingleTravellingAllowance,
  getTodayTravellingAllowance,
}
