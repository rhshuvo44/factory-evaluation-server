import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import {
  TFactoryDevelopment,
  TFactoryDevelopmentUpdate,
} from './factoryDevelopment.interface'
import { FactoryDevelopment } from './factoryDevelopment.model'

const createFactoryDevelopment = async (payload: TFactoryDevelopment) => {
  /*
   //! TODO: must be imput everyday 
   input date and compare database input date if not insert previously date must be input previous date
   if insert previous date can insert currrent date 
    */
  const now = new Date()
  const date = new Date(payload.date)

  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)
  if (startOfRange <= date && date <= now) {
    const result = await FactoryDevelopment.create({ ...payload, date })
    return result
  } else {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Data creation is only allowed for the last 45 days',
    )
  }
}
const getFactoryDevelopment = async (query: Record<string, unknown>) => {
  // Get the current date
  const now = new Date()
  // Calculate the first and last day of the current month

  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)

  // End date is the current date
  const endOfRange = new Date(now)

  const dataQuery = new QueryBuilder(
    FactoryDevelopment.find({
      date: { $gte: startOfRange, $lte: endOfRange },
    }).sort({
      slNo: -1,
    }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()
  await FactoryDevelopment.deleteMany({ date: { $lt: startOfRange } })

  const meta = await dataQuery.countTotal()
  const data = await dataQuery.modelQuery

  const result = data.map(item => ({
    ...item.toObject(),
    date: format(item.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
  }))
  // // Calculate the total price
  const totalPrice = data.reduce((sum, item) => sum + item.totalPrice, 0)

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

  // Set the end of the current day
  const endOfDay = new Date(now.setHours(23, 59, 59, 999))

  const result = await FactoryDevelopment.find({
    date: { $gte: startOfDay, $lte: endOfDay },
  })
  let data
  if (result.length > 0) {
    // If records are found, map the results to the desired format
    const totalPrice = result.reduce((sum, data) => sum + data.totalPrice, 0)
    const unitPrice = result.reduce((sum, data) => sum + data.unitPrice, 0)

    return (data = {
      slNo: 1,
      date: format(startOfDay, 'dd-MM-yyyy'),
      particulars: '',
      description: '',
      remark: '-',
      quantity: 1,
      buyerId: 1,
      orderedBy: '',
      memoNo: 1,
      payTo: '-',
      paymentType: 'Once',
      unit: 'Day',
      unitPrice: unitPrice,
      totalPrice: totalPrice,
    })
  } else {
    // If no records are found, set default data structure
    data = {
      slNo: 1,
      date: format(startOfDay, 'dd-MM-yyyy'),
      particulars: '',
      description: '',
      quantity: 0,
      orderedBy: '',
      memoNo: 0,
      payTo: '-',
      paymentType: 'Once',
      unit: 'Day',
      unitPrice: 0,
      totalPrice: 0,
    }
  }
  return data
}
const getSingleFactoryDevelopment = async (id: string) => {
  const data = await FactoryDevelopment.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }

  return data
}
const updateFactoryDevelopment = async (
  payload: TFactoryDevelopmentUpdate,
  id: string,
) => {
  let date
  if (payload?.date) {
    date = new Date(payload?.date)
  }

  const data = await FactoryDevelopment.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  const result = await FactoryDevelopment.findByIdAndUpdate(
    id,
    { ...payload, date },
    {
      new: true,
      runValidators: true,
    },
  )
  return result
}
const deletedFactoryDevelopment = async (id: string) => {
  const data = await FactoryDevelopment.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  await FactoryDevelopment.deleteOne({ _id: id })
}
export const factoryDevelopmentService = {
  createFactoryDevelopment,
  getFactoryDevelopment,
  updateFactoryDevelopment,
  deletedFactoryDevelopment,
  getSingleFactoryDevelopment,
  getToday,
}
