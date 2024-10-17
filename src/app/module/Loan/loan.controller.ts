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
  const data = await loanService.getLoan(req?.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Data fetch successfully',
    meta: data.meta,
    totalPrice: data.totalPrice,
    data: data.result,
  })
})
const getToday: RequestHandler = catchAsync(async (req, res) => {
  const data = await loanService.getToday()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Today successfully',
    data,
  })
})
const getSingleLoan = catchAsync(async (req, res) => {
  const id = req?.params.id
  const data = await loanService.getSingleLoan(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Single Data successfully',
    data,
  })
})
const updateLoan = catchAsync(async (req, res) => {
  const id = req?.params.id
  const result = await loanService.updateLoan(req?.body, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Data successfully',
    data: result,
  })
})
const deleteLoan = catchAsync(async (req, res) => {
  const id = req?.params.id
  await loanService.deletedLoan(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Loan successfully',
    data: null,
  })
})
export const loanController = {
  createLoan,
  getAllLoan,
  updateLoan,
  deleteLoan,
  getSingleLoan,
  getToday,
}
