import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TReport } from './report.interface'
import { Report } from './report.model'

const createReport = async (payload: TReport) => {
  const now = new Date()
  const date = new Date(payload.date)

  const startOfRange = new Date(now.getFullYear(), now.getMonth(), 1)
  // Get the previous day
  const previousDay = new Date(date)
  previousDay.setDate(date.getDate() - 1)

  // Get the most recent entry from the database
  const lastEntry = await Report.findOne().sort({ date: -1 })

  if (!lastEntry) {
    // If no data at all, create the entry if within range
    if (startOfRange <= date && date <= now) {
      const result = await Report.create({ ...payload, date })
      return result
    } else {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Report creation is only allowed for the current month',
      )
    }
  }

  // Check for missing entries between last date and the input date
  const lastDate = new Date(lastEntry.date)
  const currentDate = new Date(lastDate)
  currentDate.setDate(lastDate.getDate() + 1)

  const missingDates = []

  while (currentDate < date) {
    const entryExists = await Report.findOne({
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
      `Missing Report entries for the following date(s): ${missingDates.join(', ')}.`,
    )
  }

  // Ensure the date is within the allowed range of the last 45 days
  if (startOfRange <= date && date <= now) {
    // Check if there's already an entry for the given date (only one entry per day)
    const existingEntry = await Report.findOne({
      date: date.setHours(0, 0, 0, 0), // Zero out the time for date-only comparison
    })

    if (existingEntry) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'A report entry already exists for the given date',
      )
    }

    const result = await Report.create({ ...payload, date })
    return result
  } else {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Report creation is only allowed for the current month',
    )
  }
}
const getReport = async (query: Record<string, unknown>) => {
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
    Report.find({
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
  await Report.deleteOne({ date: { $lt: startOfRange } })

  const meta = await dataQuery.countTotal()
  const data = await dataQuery.modelQuery

  const result = data.map(item => ({
    ...item.toObject(),
    date: format(item.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
  }))

  const totalPrice = result.reduce((sum, balance) => sum + balance.balance, 0)
  return {
    meta,
    result,
    totalPrice,
  }
}
const getAllReportDownload = async () => {
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

  const data = await Report.find({
    date: { $gte: startOfMonth, $lte: endOfMonth },
  })
    .sort({
      date: -1,
    })
    .select('date factoryRunningCost factoryCollection balance -_id')
  const result = data.map(item => ({
    Date: format(item.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
    'Factory RunningCost': item.factoryRunningCost,
    'Factory Collection': item.factoryCollection,
    Balance: item.balance,
  }))
  return result
}
const deletedReport = async (id: string) => {
  const data = await Report.findById(id)
  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'data not found')
  }
  await Report.deleteOne({ _id: id })
}
export const reportService = {
  createReport,
  getReport,
  deletedReport,
  getAllReportDownload,
}
