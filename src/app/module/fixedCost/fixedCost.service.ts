import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { calculateFixedTotalPrices } from '../../utils/calculateFixedTotalPrice'
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

  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)

  // End date is the current date
  const endOfRange = new Date(now)

  const dataQuery = new QueryBuilder(
    FixedCost.find({
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
  await FixedCost.deleteMany({ date: { $lt: startOfRange } })

  const meta = await dataQuery.countTotal()
  const data = await dataQuery.modelQuery

  const result = data.map(item => ({
    ...item.toObject(),
    date: format(item.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
  }))

  const { factoryRent, honorary, factoryRevenue } =
    calculateFixedTotalPrices(data)
  const totalPrice = factoryRent + honorary + factoryRevenue
  return {
    meta,
    result,
    totalPrice,
  }
}
const getToday = async () => {
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

  // Set the start of the current day
  const startOfDay = new Date(now.setHours(0, 0, 0, 0))

  // Set the end of the current day
  // const endOfDay = new Date(now.setHours(23, 59, 59, 999))

  const result = await FixedCost.findOne({
    date: { $gte: startOfMonth, $lte: endOfMonth },
  }).sort({ updatedAt: -1 })
  let data
  if (result) {
    // If records are found, map the results to the desired format
    data = [
      {
        ...result.toObject(),
        date: format(startOfDay, 'dd-MM-yyyy'), // Format date as 'DD-MM-YYYY'
      },
    ]
  } else {
    // If no records are found, set default data structure
    data = [
      {
        slNo: 1,
        date: format(startOfDay, 'dd-MM-yyyy'),
        factoryRent: [
          {
            unitPrice: 0,
            totalPrice: 0,
          },
        ],
        honorary: [
          {
            unitPrice: 0,
            totalPrice: 0,
          },
        ],
        factoryRevenue: [
          {
            unitPrice: 0,
            totalPrice: 0,
          },
        ],
      },
    ]
  }
  return data
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
  getToday,
}
