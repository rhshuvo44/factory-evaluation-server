import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TravelService } from './travel.service'

const createTravellingAllowance = catchAsync(async (req, res) => {
  const TravellingAllowance = await TravelService.createTravelAllowance(
    req?.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Travelling Allowance successfully',
    data: TravellingAllowance,
  })
})
const getAllTravellingAllowance: RequestHandler = catchAsync(
  async (req, res) => {
    const TravellingAllowances = await TravelService.getTravelAllowance(
      req?.query,
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Travelling Allowance successfully',
      data: TravellingAllowances,
    })
  },
)
const getSingleTravellingAllowance: RequestHandler = catchAsync(
  async (req, res) => {
    const id: string = req?.params.id
    const TravellingAllowances =
      await TravelService.getSingleTravelAllowance(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Travelling Allowance successfully',
      data: TravellingAllowances,
    })
  },
)
const updateTravellingAllowance = catchAsync(async (req, res) => {
  const id: string = req?.params.id
  const TravellingAllowances = await TravelService.UpdateTravelAllowance(
    req?.body,
    id,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Travelling Allowance successfully',
    data: TravellingAllowances,
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
}
