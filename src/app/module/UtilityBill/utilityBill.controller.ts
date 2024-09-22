import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { utilityService } from './utilityBill.service'

const createUtility = catchAsync(async (req, res) => {
    const data = await utilityService.createUtility(req?.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create data successfully',
        data: data,
    })
})


export const utilityController = {
    createUtility
}
