import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { miscellaneousService } from './miscellaneous.service'

const createMiscellaneous = catchAsync(
    async (req: Request, res: Response) => {
        const miscellaneous = await miscellaneousService.createMiscellaneous(
            req?.body,
        )
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Create Miscellaneous successfully',
            data: miscellaneous,
        })
    },
)

export const miscellaneousController = {
    createMiscellaneous,
}
