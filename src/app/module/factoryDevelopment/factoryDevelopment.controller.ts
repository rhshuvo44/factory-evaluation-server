import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { factoryDevelopmentService } from './factoryDevelopment.service'

const createFactoryDevelopment = catchAsync(async (req, res) => {
    const data = await factoryDevelopmentService.createFactoryDevelopment(req?.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create data successfully',
        data: data,
    })
})

export const factoryDevelopmentController = {
    createFactoryDevelopment,

}
