import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TCollection, TCollectionUpdate } from './collection.interface'
import { Collection } from './collection.model'

const createCollection = async (payload: TCollection) => {
  const date = new Date(payload.date)

  const result = await Collection.create({ ...payload, date })
  return result
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
const getToday = async (payload: string) => {
  // const now = new Date()
  const now = payload ? new Date(payload) : new Date()

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
