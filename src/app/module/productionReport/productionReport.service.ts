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
  const date = new Date(payload.date)

  const result = await ProductionReport.create({
    ...payload,
    date,
  })
  return result
}
const getProductionReport = async (query: Record<string, unknown>) => {
  // Get the current date
  const now = new Date()

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
  const dataQuery = new QueryBuilder(
    ProductionReport.find({
      date: { $gte: startOfMonth, $lte: endOfMonth },
    }).sort({
      slNo: 1,
    }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

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
}
