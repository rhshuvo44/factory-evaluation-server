import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { employeeService } from './employee.service'

const createEmployee = catchAsync(async (req, res) => {
  const data = await employeeService.createEmployee(req?.file, req?.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create data successfully',
    data,
  })
})

const getAllEmployee: RequestHandler = catchAsync(async (req, res) => {
  const data = await employeeService.getEmployee(req?.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Data fetch successfully',
    data,
  })
})
const getToday = catchAsync(async (req, res) => {
  const data = await employeeService.getToday()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get today Data fetch successfully',
    data,
  })
})
const getSingleEmployee = catchAsync(async (req, res) => {
  const id = req?.params.id
  const data = await employeeService.getSingleEmployee(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Data successfully',
    data,
  })
})
const updateEmployee = catchAsync(async (req, res) => {
  const id = req?.params.id
  const data = await employeeService.updateEmployee(req?.body, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Data successfully',
    data,
  })
})
const deleteEmployee = catchAsync(async (req, res) => {
  const id = req?.params.id
  await employeeService.deletedEmployee(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted data successfully',
    data: null,
  })
})
export const employeeController = {
  createEmployee,
  getAllEmployee,
  updateEmployee,
  deleteEmployee,
  getSingleEmployee,
  getToday
}
