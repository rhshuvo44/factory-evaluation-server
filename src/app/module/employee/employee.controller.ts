import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { employeeService } from './employee.service'

const createEmployee = catchAsync(async (req, res) => {
  const data = await employeeService.createEmployee(req?.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create data successfully',
    data: data,
  })
})

const getAllEmployee: RequestHandler = catchAsync(async (req, res) => {
  const result = await employeeService.getEmployee(req?.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Data fetch successfully',
    data: result,
  })
})
const updateEmployee = catchAsync(async (req, res) => {
  const id = req?.params.id
  const result = await employeeService.updateEmployee(req?.body, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Data successfully',
    data: result,
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
}