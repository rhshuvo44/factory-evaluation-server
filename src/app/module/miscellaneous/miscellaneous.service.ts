import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TMiscellaneous, TMiscellaneousUpdate } from './miscellaneous.interface'
import { Miscellaneous } from './miscellaneous.model'

const createMiscellaneous = async (payload: TMiscellaneous) => {
  const now = new Date()
  const date = new Date(payload.date)

  // Set the start of the allowable date range (last 45 days)
  // const startOfRange = new Date(now)
  // startOfRange.setDate(now.getDate() - 45)
  const startOfRange = new Date(now.getFullYear(), now.getMonth(), 1)
  // Get the previous day
  const previousDay = new Date(date)
  previousDay.setDate(date.getDate() - 1)

  // Get the most recent entry from the database
  const lastEntry = await Miscellaneous.findOne().sort({ date: -1 })

  if (!lastEntry) {
    // If no data at all, create the entry if within range
    if (startOfRange <= date && date <= now) {
      const result = await Miscellaneous.create({ ...payload, date })
      return result
    } else {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Miscellaneous Report creation is only allowed for the current month',
      )
    }
  }

  // Check for missing entries between last date and the input date
  const lastDate = new Date(lastEntry.date)
  const currentDate = new Date(lastDate)
  currentDate.setDate(lastDate.getDate() + 1)

  const missingDates = []

  while (currentDate < date) {
    const entryExists = await Miscellaneous.findOne({
      date: currentDate.setHours(0, 0, 0, 0),
    })

    if (!entryExists) {
      missingDates.push(new Date(currentDate).toISOString().split('T')[0]) // Collect missing dates
    }

    currentDate.setDate(currentDate.getDate() + 1) // Move to next day
  }

  if (missingDates.length > 0) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      `Missing Miscellaneous report entries for the following date(s): ${missingDates.join(', ')}.`,
    )
  }

  // Ensure the date is within the allowed range of the current month
  if (startOfRange <= date && date <= now) {
    const result = await Miscellaneous.create({ ...payload, date })
    return result
  } else {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Miscellaneous creation is only allowed for the current month',
    )
  }
}
const getMiscellaneous = async (query: Record<string, unknown>) => {
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
    Miscellaneous.find({
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
  await Miscellaneous.deleteOne({ date: { $lt: startOfRange } })

  const meta = await dataQuery.countTotal()
  const miscellaneous = await dataQuery.modelQuery
  const result = miscellaneous.map(item => ({
    ...item.toObject(),
    date: format(item.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
  }))
  // // Calculate the total price
  const totalPrice = miscellaneous.reduce(
    (sum, item) => sum + item.totalPrice,
    0,
  )

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

  const result = await Miscellaneous.find({
    date: { $gte: startOfDay, $lte: endOfDay },
  })
  let data
  if (result.length > 0) {
    // If records are found, map the results to the desired format
    // const totalPrice = result.reduce((sum, data) => sum + data.totalPrice, 0)
    const unitPrice = result.reduce((sum, data) => sum + data.unitPrice, 0)
    return (data = {
      slNo: 1,
      date: format(startOfDay, 'dd-MM-yyyy'),
      particulars: '',
      description: '-',
      remark: '-',
      buyerId: '-',
      orderNo: '-',
      memoNo: '-',
      payTo: '-',
      paymentType: 'Once',
      unit: 'Day',
      unitPrice: unitPrice,
      totalPrice: '-',
    })
  } else {
    // If no records are found, set default data structure
    data = {
      slNo: 1,
      date: format(startOfDay, 'dd-MM-yyyy'),
      particulars: '',
      description: '-',
      remark: '',
      buyerId: '-',
      orderNo: '-',
      memoNo: '-',
      payTo: '',
      paymentType: 'Once',
      unit: 'Day',
      unitPrice: 0,
      totalPrice: '-',
    }
  }
  return data
}
const getSingleMiscellaneous = async (id: string) => {
  const miscellaneous = await Miscellaneous.findById(id)

  if (!miscellaneous) {
    throw new AppError(httpStatus.NOT_FOUND, 'Miscellaneous not found')
  }

  return miscellaneous
}
const UpdateMiscellaneous = async (
  payload: TMiscellaneousUpdate,
  id: string,
) => {
  let date
  if (payload?.date) {
    date = new Date(payload?.date)
  }
  const miscellaneous = await Miscellaneous.findById(id)

  if (!miscellaneous) {
    throw new AppError(httpStatus.NOT_FOUND, 'Miscellaneous not found')
  }
  const updatedMiscellaneous = await Miscellaneous.findByIdAndUpdate(
    id,
    { ...payload, date },
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedMiscellaneous
}
const deletedMiscellaneous = async (id: string) => {
  const miscellaneous = await Miscellaneous.findById(id)

  if (!miscellaneous) {
    throw new AppError(httpStatus.NOT_FOUND, 'Miscellaneous not found')
  }
  await Miscellaneous.deleteOne({ _id: id })
}
export const miscellaneousService = {
  createMiscellaneous,
  getMiscellaneous,
  UpdateMiscellaneous,
  deletedMiscellaneous,
  getSingleMiscellaneous,
  getToday,
}
