import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TTravel, TTravelUpdate } from './travel.interface'
import { Travel } from './travel.model'

const createTravelAllowance = async (payload: TTravel) => {
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
  // const anyEntryExists = await Travel.findOne({})

  // if (!anyEntryExists) {
  //   // If no data at all, create the entry
  //   if (startOfRange <= date && date <= now) {
  //     const result = await Travel.create({ ...payload, date })
  //     return result
  //   } else {
  //     throw new AppError(
  //       httpStatus.FORBIDDEN,
  //       'Travelling allowance creation is only allowed for the last 45 days',
  //     )
  //   }
  // }

  // // Check if the previous day has an entry in the database
  // const previousEntryExists = await Travel.findOne({
  //   date: previousDay.setHours(0, 0, 0, 0),
  // })

  // if (!previousEntryExists) {
  //   throw new AppError(
  //     httpStatus.FORBIDDEN,
  //     'You must input the previous day’s travel allowance before entering today’s.',
  //   )
  // }
  // Get the most recent entry from the database
  const lastEntry = await Travel.findOne().sort({ date: -1 })

  if (!lastEntry) {
    // If no data at all, create the entry if within range
    if (startOfRange <= date && date <= now) {
      const result = await Travel.create({ ...payload, date })
      return result
    } else {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Travelling allowance creation is only allowed for the current month',
      )
    }
  }

  // Check for missing entries between last date and the input date
  const lastDate = new Date(lastEntry.date)
  const currentDate = new Date(lastDate)
  currentDate.setDate(lastDate.getDate() + 1)

  const missingDates = []

  while (currentDate < date) {
    const entryExists = await Travel.findOne({
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
      `Missing travel allowance entries for the following date(s): ${missingDates.join(', ')}.`,
    )
  }

  // Ensure the date is within the allowed range of the last 45 days
  if (startOfRange <= date && date <= now) {
    const result = await Travel.create({ ...payload, date })
    return result
  } else {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Travel allowance creation is only allowed for the current month',
    )
  }
}
const getTravelAllowance = async (query: Record<string, unknown>) => {
  // Get the current date
  const now = new Date()

  // Calculate the date 45 days ago
  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)
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
  // End date is the current date
  // const endOfRange = new Date(now)

  const travelQuery = new QueryBuilder(
    Travel.find({ date: { $gte: startOfMonth, $lte: endOfMonth } }).sort({
      slNo: -1,
    }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()
  await Travel.deleteOne({ date: { $lt: startOfRange } })
  const meta = await travelQuery.countTotal()
  const travel = await travelQuery.modelQuery

  // Format the dates in the response
  const result = travel.map(item => ({
    ...item.toObject(),
    date: format(item.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
  }))
  // // Calculate the total price
  const totalPrice = result.reduce((sum, travel) => sum + travel.totalPrice, 0)

  return {
    meta,
    result,
    totalPrice,
  }
}
const getTodayTravellingAllowance = async (payload: string
) => {
  // const now = new Date()
  // const date = new Date(payload.date)
  
  const now = payload ? new Date(payload) : new Date();

  // Set the start of the current day
  const startOfDay = new Date(now.setHours(0, 0, 0, 0))

  // Set the end of the current day
  const endOfDay = new Date(now.setHours(23, 59, 59, 999))

  const result = await Travel.find({
    date: { $gte: startOfDay, $lte: endOfDay },
  })

  let data
  if (result.length > 0) {
    const unitPrice = result.reduce((sum, travel) => sum + travel.unitPrice, 0)
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
      remark: '-',
      buyerId: '-',
      orderNo: '-',
      memoNo: '-',
      payTo: '-',
      paymentType: 'Once',
      unit: 'Day',
      unitPrice: 0,
      totalPrice: '-',
    }
  }
  return data
}
const getSingleTravelAllowance = async (id: string) => {
  const result = Travel.findById(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Travel not found')
  }

  return result
}

const UpdateTravelAllowance = async (payload: TTravelUpdate, id: string) => {
  let date
  if (payload?.date) {
    date = new Date(payload?.date)
  }
  const travel = await Travel.findById(id)

  if (!travel) {
    throw new AppError(httpStatus.NOT_FOUND, 'Travel not found')
  }
  const updatedTravelAllowance = await Travel.findByIdAndUpdate(
    id,
    { ...payload, date },
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedTravelAllowance
}
const deletedTravelAllowance = async (id: string) => {
  const travel = await Travel.findById(id)

  if (!travel) {
    throw new AppError(httpStatus.NOT_FOUND, 'Travel not found')
  }
  await Travel.deleteOne({ _id: id })
}
export const TravelService = {
  createTravelAllowance,
  getTravelAllowance,
  UpdateTravelAllowance,
  deletedTravelAllowance,
  getSingleTravelAllowance,
  getTodayTravellingAllowance,
}
