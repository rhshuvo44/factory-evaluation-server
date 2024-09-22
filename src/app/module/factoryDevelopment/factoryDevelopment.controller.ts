import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { factoryDevelopmentService } from './factoryDevelopment.service'
import { RequestHandler } from 'express'

const createFactoryDevelopment = catchAsync(async (req, res) => {
    const data = await factoryDevelopmentService.createFactoryDevelopment(req?.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create data successfully',
        data: data,
    })
})

const getAllFactoryDevelopment: RequestHandler = catchAsync(async (req, res) => {
    const result = await factoryDevelopmentService.getFactoryDevelopment(req?.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get All Data fetch successfully',
        data: result,
    })
})
export const factoryDevelopmentController = {
    createFactoryDevelopment,
    getAllFactoryDevelopment

}
