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
    const result = await BuyerDevelopment.create({ ...payload, date })
    return result
  } else {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Data creation is only allowed for the last 45 days',
    )
  }

}
const getBuyerDevelopment = async (query: Record<string, unknown>) => {
  // Get the current date
  const now = new Date()
  // Calculate the first and last day of the current month

  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)

  // End date is the current date
  const endOfRange = new Date(now)

  const dataQuery = new QueryBuilder(
    BuyerDevelopment.find({ date: { $gte: startOfRange, $lte: endOfRange } }).sort({
      slNo: -1,
    }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()
  await BuyerDevelopment.deleteMany({ date: { $lt: startOfRange } })

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

  const result = await BuyerDevelopment.findOne({
    date: { $gte: startOfDay, $lte: endOfDay },
  })
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  return result
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
  getSingleBuyerDevelopment, getToday
}
