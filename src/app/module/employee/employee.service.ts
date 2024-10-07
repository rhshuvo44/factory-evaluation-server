import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'
import { TEmployee, TEmployeeUpdate } from './employee.interface'
import { Employee } from './employee.model'

const createEmployee = async (file: any, payload: TEmployee) => {
  if (file) {
    const imageName = payload?.name
    const path = file?.path

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path)

    payload.photo = secure_url as string
  }
  const result = await Employee.create(payload)
  return result
}
const getEmployee = async (query: Record<string, unknown>) => {
  const dataQuery = new QueryBuilder(Employee.find().sort({ slNo: 1 }), query)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await dataQuery.countTotal()
  const result = await dataQuery.modelQuery

  // // Calculate the total price
  const totalPrice = result.reduce(
    (sum, item) => sum + item.grossPerDaySalary,
    0,
  )

  return {
    meta,
    result,
    totalPrice,
  }
}
const getSingleEmployee = async (id: string) => {
  const data = await Employee.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }

  return data
}
const updateEmployee = async (payload: TEmployeeUpdate, id: string) => {
  const data = await Employee.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  const result = await Employee.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const deletedEmployee = async (id: string) => {
  const data = await Employee.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  await Employee.deleteOne({ _id: id })
}
export const employeeService = {
  createEmployee,
  getEmployee,
  updateEmployee,
  deletedEmployee,
  getSingleEmployee,
}
