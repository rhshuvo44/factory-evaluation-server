import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TravelService } from './travel.service'

const createTravellingAllowance = catchAsync(
  async (req: Request, res: Response) => {
    const TravellingAllowance = await TravelService.createTravelAllowance(
      req?.body,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Create Travelling Allowance successfully',
      data: TravellingAllowance,
    })
  },
)
const getAllTravellingAllowance = catchAsync(
  async (req: Request, res: Response) => {
    const TravellingAllowances = await TravelService.getTravelAllowance()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Travelling Allowance successfully',
      data: TravellingAllowances,
    })
  },
)
const updateTravellingAllowance = catchAsync(
  async (req: Request, res: Response) => {
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
  },
)
export const travelController = {
  createTravellingAllowance,
  getAllTravellingAllowance,
  updateTravellingAllowance,
}
