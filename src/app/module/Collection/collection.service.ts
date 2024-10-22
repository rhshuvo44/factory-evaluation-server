import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TCollection, TCollectionUpdate } from './collection.interface'
import { Collection } from './collection.model'

const createCollection = async (payload: TCollection) => {
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
  const lastEntry = await Collection.findOne().sort({ date: -1 })

  if (!lastEntry) {
    // If no data at all, create the entry if within range
    if (startOfRange <= date && date <= now) {
      const result = await Collection.create({ ...payload, date })
      return result
    } else {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Collection Report creation is only allowed for the current month',
      )
    }
  }

  // Check for missing entries between last date and the input date
  const lastDate = new Date(lastEntry.date)
  const currentDate = new Date(lastDate)
  currentDate.setDate(lastDate.getDate() + 1)

  const missingDates = []

  while (currentDate < date) {
    const entryExists = await Collection.findOne({
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
      `Missing Collection report entries for the following date(s): ${missingDates.join(', ')}.`,
    )
  }

  // Ensure the date is within the allowed range of the last 45 days
  if (startOfRange <= date && date <= now) {
    const result = await Collection.create({ ...payload, date })
    return result
  } else {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Collection  creation is only allowed for the current month',
    )
  }
}
const getCollection = async (query: Record<string, unknown>) => {
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
    Collection.find({ date: { $gte: startOfMonth, $lte: endOfMonth } }).sort({
      slNo: -1,
    }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()
  await Collection.deleteOne({ date: { $lt: startOfRange } })

  const meta = await dataQuery.countTotal()
  const data = await dataQuery.modelQuery

  const result = data.map(item => ({
    ...item.toObject(),
    date: format(item.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
  }))
  // // Calculate the total price
  const totalPrice = data.reduce((sum, item) => sum + item.amount, 0)

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

  const result = await Collection.find({
    date: { $gte: startOfDay, $lte: endOfDay },
  })
  let data
  if (result.length > 0) {
    // If records are found, map the results to the desired format
    // data = result.map(item => ({
    //   ...item.toObject(),
    //   date: format(item.date, 'dd-MM-yyyy'), // Format date as 'DD-MM-YYYY'
    // }))
    const amount = result.reduce((sum, data) => sum + data.amount, 0)

    return (data = {
      slNo: 1,
      date: format(startOfDay, 'dd-MM-yyyy'),
      amount: amount,
    })
  } else {
    // If no records are found, set default data structure
    data = {
      slNo: 1,
      date: format(startOfDay, 'dd-MM-yyyy'),

      amount: 0,
    }
  }
  return data
}
const getSingleCollection = async (id: string) => {
  const data = await Collection.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  return data
}
const updateCollection = async (payload: TCollectionUpdate, id: string) => {
  let date
  if (payload?.date) {
    date = new Date(payload?.date)
  }
  const data = await Collection.findById(id)
  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  const result = await Collection.findByIdAndUpdate(
    id,
    { ...payload, date },
    {
      new: true,
      runValidators: true,
    },
  )
  return result
}
const deletedCollection = async (id: string) => {
  const data = await Collection.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  await Collection.deleteOne({ _id: id })
}
export const collectionService = {
  createCollection,
  getCollection,
  updateCollection,
  deletedCollection,
  getSingleCollection,
  getToday,
}
