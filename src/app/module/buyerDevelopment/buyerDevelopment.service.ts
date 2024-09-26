import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import {
  TBuyerDevelopment,
  TBuyerDevelopmentUpdate,
} from './buyerDevelopment.interface'
import { BuyerDevelopment } from './buyerDevelopment.model'

const createBuyerDevelopment = async (payload: TBuyerDevelopment) => {
  const date = new Date(payload.date)

  const result = await BuyerDevelopment.create({ ...payload, date })
  return result
}
const getBuyerDevelopment = async (query: Record<string, unknown>) => {
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
    BuyerDevelopment.find({
      date: { $gte: startOfMonth, $lte: endOfMonth },
    }).sort({ slNo: 1 }),
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
  // // Calculate the total price
  const totalPrice = data.reduce((sum, item) => sum + item.totalPrice, 0)

  return {
    meta,
    result,
    totalPrice,
  }
}
const getSingleBuyerDevelopment = async (id: string) => {
  const data = await BuyerDevelopment.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }

  return data
}
const updateBuyerDevelopment = async (
  payload: TBuyerDevelopmentUpdate,
  id: string,
) => {
  let date
  if (payload?.date) {
    date = new Date(payload?.date)
  }

  const data = await BuyerDevelopment.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  const result = await BuyerDevelopment.findByIdAndUpdate(
    id,
    { ...payload, date },
    {
      new: true,
      runValidators: true,
    },
  )
  return result
}
const deletedBuyerDevelopment = async (id: string) => {
  const data = await BuyerDevelopment.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  await BuyerDevelopment.deleteOne({ _id: id })
}
export const buyerDevelopmentService = {
  createBuyerDevelopment,
  getBuyerDevelopment,
  updateBuyerDevelopment,
  deletedBuyerDevelopment,
  getSingleBuyerDevelopment,
}
