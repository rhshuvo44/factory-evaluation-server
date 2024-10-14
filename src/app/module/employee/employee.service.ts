import { format } from 'date-fns'
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

const getToday = async () => {
  const now = new Date()

  // Set the start of the current day
  const startOfDay = new Date(now.setHours(0, 0, 0, 0))

  const result = await Employee.find({
    status: 'P',
  })
  let data

  if (result.length > 0) {
    // If records are found, map the results to the desired format
    data = result.map(item => ({
      ...item.toObject(),
      date: format(startOfDay, 'dd-MM-yyyy'), // Format date as 'DD-MM-YYYY'
    }))
    const unitPrice = result.reduce(
      (sum, data) => sum + data.grossPerDaySalary,
      0,
    )
    return (data = {
      slNo: 1,
      date: format(startOfDay, 'dd-MM-yyyy'),
      name: '',
      designation: '',
      paymentType: 'Once',
      remark: '-',
      unit: 'Day',
      unitPrice: unitPrice,
      totalPrice: '-',
    })
  } else {
    // If no records are found, set default data structure
    data = {
      slNo: 1,
      date: format(startOfDay, 'dd-MM-yyyy'),
      name: '',
      designation: '',
      paymentType: 'Once',
      remark: '-',
      unit: 'Day',
      unitPrice: 0,
      totalPrice: '-',
    }
  }
  return data
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
  getToday,
}
