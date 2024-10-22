import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TTargetOutput, TTargetOutputUpdate } from './target&Output.interface'
import { TargetOutput } from './target&Output.model'

const createTargetOutput = async (payload: TTargetOutput) => {
  const now = new Date()
  const date = new Date(payload.date)

  // Set the start of the allowable date range (last 45 days)
  // const startOfRange = new Date(now)
  // startOfRange.setDate(now.getDate() - 45)
  const startOfRange = new Date(now.getFullYear(), now.getMonth(), 1)
  // Get the previous day
  const previousDay = new Date(date)
  previousDay.setDate(date.getDate() - 1)
  // Check if there is any data in the database
  const lastEntry = await TargetOutput.findOne().sort({ date: -1 })

  if (!lastEntry) {
    // If no data at all, create the entry if within range
    if (startOfRange <= date && date <= now) {
      const result = await TargetOutput.create({ ...payload, date })
      return result
    } else {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Target output creation is only allowed for the current month',
      )
    }
  }

  // Check for missing entries between last date and the input date
  const lastDate = new Date(lastEntry.date)
  const currentDate = new Date(lastDate)
  currentDate.setDate(lastDate.getDate() + 1)

  const missingDates = []

  while (currentDate < date) {
    const entryExists = await TargetOutput.findOne({
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
      `Missing target output entries for the following date(s): ${missingDates.join(', ')}.`,
    )
  }

  // Ensure the date is within the allowed range of the last 45 days
  if (startOfRange <= date && date <= now) {
    const result = await TargetOutput.create({ ...payload, date })
    return result
  } else {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Target output creation is only allowed for the current month',
    )
  }
}
const getTargetOutput = async (query: Record<string, unknown>) => {
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

  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)

  // End date is the current date
  // const endOfRange = new Date(now)

  const dataQuery = new QueryBuilder(
    TargetOutput.find({
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
  await TargetOutput.deleteOne({ date: { $lt: startOfRange } })

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

  const result = await TargetOutput.find({
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
const getSingleTargetOutput = async (id: string) => {
  const data = await TargetOutput.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'data not found')
  }

  return data
}
const UpdateTargetOutput = async (payload: TTargetOutputUpdate, id: string) => {
  let date
  if (payload?.date) {
    date = new Date(payload?.date)
  }
  const data = await TargetOutput.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'data not found')
  }
  const updatedTargetOutput = await TargetOutput.findByIdAndUpdate(
    id,
    { ...payload, date },
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedTargetOutput
}
const deletedTargetOutput = async (id: string) => {
  const data = await TargetOutput.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'data not found')
  }
  await TargetOutput.deleteOne({ _id: id })
}
export const targetOutputService = {
  createTargetOutput,
  getTargetOutput,
  UpdateTargetOutput,
  deletedTargetOutput,
  getSingleTargetOutput,
  getToday,
}
