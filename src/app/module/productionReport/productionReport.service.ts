import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import {
  TProductionReport,
  TProductionReportUpdate,
} from './productionReport.interface'
import { ProductionReport } from './productionReport.model'

const createProductionReport = async (payload: TProductionReport) => {
  const now = new Date()
  const date = new Date(payload.date)

  // Set the start of the allowable date range (last 45 days)
  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)

  // Get the previous day
  const previousDay = new Date(date)
  previousDay.setDate(date.getDate() - 1)

  // Check if the previous day has an entry in the database
  const previousEntryExists = await ProductionReport.findOne({
    date: previousDay.setHours(0, 0, 0, 0),
  })

  if (!previousEntryExists) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You must input the previous day’s product report before entering today’s.',
    )
  }

  // Ensure the date is within the allowed range of the last 45 days
  if (startOfRange <= date && date <= now) {
    const result = await ProductionReport.create({ ...payload, date })
    return result
  } else {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Product report creation is only allowed for the last 45 days',
    )
  }
}
const getProductionReport = async (query: Record<string, unknown>) => {
  // Get the current date
  const now = new Date()

  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)

  // End date is the current date
  const endOfRange = new Date(now)

  const dataQuery = new QueryBuilder(
    ProductionReport.find({
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
  await ProductionReport.deleteMany({ date: { $lt: startOfRange } })

  const meta = await dataQuery.countTotal()
  const data = await dataQuery.modelQuery
  const result = data.map(item => ({
    ...item.toObject(),
    date: format(item.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
  }))

  return {
    meta,
    result,
  }
}
const getToday = async () => {
  const now = new Date()

  // Set the start of the current day
  const startOfDay = new Date(now.setHours(0, 0, 0, 0))

  // Set the end of the current day
  const endOfDay = new Date(now.setHours(23, 59, 59, 999))

  const result = await ProductionReport.find({
    date: { $gte: startOfDay, $lte: endOfDay },
  })
  let data
  if (result.length > 0) {
    // If records are found, map the results to the desired format
    data = result.map(item => ({
      ...item.toObject(),
      date: format(item.date, 'dd-MM-yyyy'), // Format date as 'DD-MM-YYYY'
    }))
  } else {
    // If no records are found, set default data structure
    data = [
      {
        slNo: 1,
        date: format(startOfDay, 'dd-MM-yyyy'),
        particulars: '',
        description: '',
        remark: '',
        buyerId: 0,
        orderNo: 0,
        memoNo: 0,
        payTo: '',
        paymentType: 'Once',
        unit: 0,
        unitPrice: 0,
        totalPrice: 0,
      },
    ]
  }
  return data
}
const getSingleProductionReport = async (id: string) => {
  const data = await ProductionReport.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'data not found')
  }

  return data
}
const UpdateProductionReport = async (
  payload: TProductionReportUpdate,
  id: string,
) => {
  let date
  if (payload?.date) {
    date = new Date(payload?.date)
  }
  const data = await ProductionReport.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'data not found')
  }
  const updatedProductionReport = await ProductionReport.findByIdAndUpdate(
    id,
    { ...payload, date },
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedProductionReport
}
const deletedProductionReport = async (id: string) => {
  const data = await ProductionReport.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'data not found')
  }
  await ProductionReport.deleteOne({ _id: id })
}
export const productionReportService = {
  createProductionReport,
  getProductionReport,
  UpdateProductionReport,
  deletedProductionReport,
  getSingleProductionReport,
  getToday,
}
