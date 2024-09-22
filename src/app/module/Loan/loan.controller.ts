import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { loanService } from './loan.service'

const createLoan = catchAsync(async (req, res) => {
    const loan = await loanService.createLoan(
        req?.body,
    )
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create Loan Return successfully',
        data: loan,
    })
})


export const loanController = {
    createLoan,
}
