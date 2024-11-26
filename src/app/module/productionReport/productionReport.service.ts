import { format } from 'date-fns'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import {
  TProductionReport,
  TProductionReportUpdate,
} from './productionReport.interface'
import { ProductionReport } from './productionReport.model'
import QueryBuilder from '../../builder/QueryBuilder'

const createProductionReport = async (payload: TProductionReport) => {
  const date = new Date(payload.date)
  const shipmentDate = new Date(payload.shipmentDate)

  const result = await ProductionReport.create({
    ...payload,
    date,
    shipmentDate,
  })
  return result
}
const getProductionReport = async (query: Record<string, unknown>) => {
  // Get the current date
  const now = new Date()

  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)

  // End date is the current date
  // const endOfRange = new Date(now)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  )

  // const data = await ProductionReport.find({
  //   date: { $gte: startOfMonth, $lte: endOfMonth },
  // }).sort({
  //   orderNo: -1,
  // })
  // await ProductionReport.deleteOne({ date: { $lt: startOfRange } })
  const dataQuery = new QueryBuilder(
    ProductionReport.find({
      date: { $gte: startOfMonth, $lte: endOfMonth },
    }).sort({
      orderNo: -1,
    }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()
  await ProductionReport.deleteOne({ date: { $lt: startOfRange } })

  const meta = await dataQuery.countTotal()
  const data = await dataQuery.modelQuery
  const result = data.map(item => ({
    ...item.toObject(),
    date: format(item?.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
    shipmentDate: format(item?.shipmentDate, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
  }))
  return {
    result,
    meta,
  }
}
const getToday = async (payload: string) => {
  const now = payload ? new Date(payload) : new Date()

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
    const quantity = result.reduce((sum, data) => sum + data.quantity, 0)
    return (data = {
      date: format(startOfDay, 'dd-MM-yyyy'),
      quantity,
    })
  } else {
    // If no records are found, set default data structure
    data = {
      date: format(startOfDay, 'dd-MM-yyyy'),
      quantity: 0,
    }
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
