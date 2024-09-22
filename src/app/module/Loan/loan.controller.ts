import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { loanService } from './loan.service'

const createLoan = catchAsync(async (req, res) => {
    const loan = await loanService.createLoan(req?.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create Loan Return successfully',
        data: loan,
    })
})
const getAllLoan: RequestHandler = catchAsync(async (req, res) => {
    const loan = await loanService.getLoan(req?.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get All Loan successfully',
        data: loan,
    })
})
export const loanController = {
    createLoan,
    getAllLoan
}
