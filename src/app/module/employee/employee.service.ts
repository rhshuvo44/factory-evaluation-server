import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TEmployee, TEmployeeUpdate } from './employee.interface'
import { Employee } from './employee.model'

const createEmployee = async (payload: TEmployee) => {
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
    (sum, item) => sum + item.GrossPerDaySalary,
    0,
  )

  return {
    meta,
    result,
    totalPrice,
  }
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
}
