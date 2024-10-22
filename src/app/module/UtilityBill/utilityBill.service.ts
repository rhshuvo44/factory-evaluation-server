import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { calculateTotalPrices } from '../../utils/calculateTotalPrice'
import { TUtility, TUtilityUpdate } from './utilityBill.interface'
import { Utility } from './utilityBill.model'

const createUtility = async (payload: TUtility) => {
  const date = new Date(payload.date)

  // Check for existing submission in the current month
  const currentMonth = date.getMonth()
  const currentYear = date.getFullYear()

  const existingSubmission = await Utility.findOne({
    date: {
      $gte: new Date(currentYear, currentMonth, 1),
      $lt: new Date(currentYear, currentMonth + 1, 1),
    },
  })

  if (existingSubmission) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You can only submit one utility entry per month.',
    )
  } else {
    const result = await Utility.create({ ...payload, date })
    return result
  }
}
const getUtility = async (query: Record<string, unknown>) => {
  // Get the current date
  const now = new Date()
  // Calculate the first and last day of the current month

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

  const dataQuery = new QueryBuilder(
    Utility.find({
      date: { $gte: startOfMonth, $lte: endOfMonth },
    }).sort({
      slNo: -1,
    }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()
  await Utility.deleteOne({ date: { $lt: startOfRange } })

  const meta = await dataQuery.countTotal()
  const data = await dataQuery.modelQuery

  const result = data.map(item => ({
    ...item.toObject(),
    electricity: item.electricity ?? [],
    internet: item.internet ?? [],
    water: item.water ?? [],
    others: item.others ?? [],
    date: format(item.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
  }))

  const { electricity, internet, water, others } = calculateTotalPrices(result)
  const totalPrice = electricity + internet + water + others
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

  const result = await Utility.findOne({
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
        internet: [
          {
            unitPrice: 0,
            totalPrice: 0,
          },
        ],
        water: [
          {
            unitPrice: 0,
            totalPrice: 0,
          },
        ],
        electricity: [
          {
            unitPrice: 0,
            totalPrice: 0,
          },
        ],
        others: [
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
const getSingleUtility = async (id: string) => {
  const data = await Utility.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  return data
}
const updateUtility = async (payload: TUtilityUpdate, id: string) => {
  const data = await Utility.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  const result = await Utility.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const deletedUtility = async (id: string) => {
  const data = await Utility.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  await Utility.deleteOne({ _id: id })
}
export const utilityService = {
  createUtility,
  getUtility,
  updateUtility,
  deletedUtility,
  getSingleUtility,
  getToday,
}
