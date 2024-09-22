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
const updateLoan = catchAsync(async (req, res) => {
    const id = req?.params.id
    const result = await loanService.updateLoan(
        req?.body,
        id,
    )

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Update Loan Allowance successfully',
        data: result,
    })
})
export const loanController = {
    createLoan,
    getAllLoan, updateLoan
}