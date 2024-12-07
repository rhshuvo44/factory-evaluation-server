import { format } from 'date-fns'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TOutput } from './output.interface'
import { Output } from './output.model'

const createOutput = async (payload: TOutput) => {
  const now = new Date()
  const date = new Date(payload.date)

  // Set the start of the allowable date range (last 45 days)
  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)
  // const startOfRange = new Date(now.getFullYear(), now.getMonth(), 1)
  // Get the previous day
  const previousDay = new Date(date)
  previousDay.setDate(date.getDate() - 1)
  // Check if there is any data in the database
  const lastEntry = await Output.findOne().sort({ date: -1 })

  if (!lastEntry) {
    // If no data at all, create the entry if within range
    if (startOfRange <= date && date <= now) {
      const result = await Output.create({ ...payload, date })
      return result
    } else {
      throw new AppError(
        httpStatus.FORBIDDEN,
        ' output creation is only allowed for the current month',
      )
    }
  }

  // Check for missing entries between last date and the input date
  const lastDate = new Date(lastEntry.date)
  const currentDate = new Date(lastDate)
  currentDate.setDate(lastDate.getDate() + 1)

  const missingDates = []

  while (currentDate < date) {
    const entryExists = await Output.findOne({
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
      `Missing  output entries for the following date(s): ${missingDates.join(', ')}.`,
    )
  }

  // Ensure the date is within the allowed range of the last 45 days
  if (startOfRange <= date && date <= now) {
    const result = await Output.create({ ...payload, date })
    return result
  } else {
    throw new AppError(
      httpStatus.FORBIDDEN,
      ' output creation is only allowed for the current month',
    )
  }
}
const getOutput = async () => {
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

  // const startOfRange = new Date(now)
  // startOfRange.setDate(now.getDate() - 45)

  // End date is the current date
  // const endOfRange = new Date(now)

  const data = await Output.find({
    date: { $gte: startOfMonth, $lte: endOfMonth },
  }).sort({
    date: -1,
  })
  // await Output.deleteOne({ date: { $lt: startOfRange } })

  const result = data.map(item => ({
    ...item.toObject(),
    date: format(item.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
  }))
  const totalPackingCompleted = result.reduce(
    (sum, data) => sum + data.packingCompleted,
    0,
  )
  return {
    result,
    totalPackingCompleted
  }
}

const deletedOutput = async (id: string) => {
  const data = await Output.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'data not found')
  }
  await Output.deleteOne({ _id: id })
}
export const outputService = {
  createOutput,
  getOutput,
  deletedOutput,
}
