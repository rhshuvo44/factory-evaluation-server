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
  /*
  //! TODO: must be input everyday 
  input date and compare database date if not insert previously date must be input previous date
  if insert previous date can insert current date 
   */
  const now = new Date()
  const date = new Date(payload.date)

  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)
  if (startOfRange <= date && date <= now) {
    const result = await ProductionReport.create({ ...payload, date })
    return result
  } else {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Data creation is only allowed for the last 45 days',
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

  const result = await ProductionReport.findOne({
    date: { $gte: startOfDay, $lte: endOfDay },
  })
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  return result
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
