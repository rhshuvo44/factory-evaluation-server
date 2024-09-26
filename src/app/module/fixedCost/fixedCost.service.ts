import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TFixedCost, TFixedCostUpdate } from './fixedCost.interface'
import { FixedCost } from './fixedCost.model'

const createFixedCost = async (payload: TFixedCost) => {
  const date = new Date(payload.date)
  const result = await FixedCost.create({ ...payload, date })
  return result
}
const getFixedCost = async (query: Record<string, unknown>) => {
  // Get the current date
  const now = new Date()
  // Calculate the first and last day of the current month

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
    FixedCost.find({ date: { $gte: startOfMonth, $lte: endOfMonth } }).sort({
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
const updateFixedCost = async (payload: TFixedCostUpdate, id: string) => {
  const data = await FixedCost.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  const result = await FixedCost.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const getSingleFixedCost = async (id: string) => {
  const data = await FixedCost.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }

  return data
}
const deletedFixedCost = async (id: string) => {
  const data = await FixedCost.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  await FixedCost.deleteOne({ _id: id })
}
export const fixedCostService = {
  createFixedCost,
  getFixedCost,
  updateFixedCost,
  deletedFixedCost,
  getSingleFixedCost,
}
