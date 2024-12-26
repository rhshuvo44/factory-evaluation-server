import { format } from 'date-fns'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import {
  TProductionCost,
  TProductionCostUpdate,
} from './productionCost.interface'
import { ProductionCost } from './productionCost.model'

const createProductionCost = async (payload: TProductionCost) => {
  const now = new Date()
  const date = new Date(payload.date)

  // Set the start of the allowable date range (last 45 days)
  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)
  // const startOfRange = new Date(now.getFullYear(), now.getMonth(), 1)
  // Get the previous day
  const previousDay = new Date(date)
  previousDay.setDate(date.getDate() - 1)

  // Get the most recent entry from the database
  const lastEntry = await ProductionCost.findOne().sort({ date: -1 })

  if (!lastEntry) {
    // If no data at all, create the entry if within range
    if (startOfRange <= date && date <= now) {
      const result = await ProductionCost.create({ ...payload, date })
      return result
    } else {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Production Cost creation is only allowed for the current month',
      )
    }
  }

  // Check for missing entries between last date and the input date
  const lastDate = new Date(lastEntry.date)
  const currentDate = new Date(lastDate)
  currentDate.setDate(lastDate.getDate() + 1)

  const missingDates = []

  while (currentDate < date) {
    const entryExists = await ProductionCost.findOne({
      date: currentDate.setHours(0, 0, 0, 0),
    })

    if (!entryExists) {
      missingDates.push(new Date(currentDate).toISOString().split('T')[0])
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  if (missingDates.length > 0) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      `Missing Production Cost entries for the following date(s): ${missingDates.join(', ')}.`,
    )
  }

  // Ensure the date is within the allowed range of the last 45 days
  if (startOfRange <= date && date <= now) {
    const result = await ProductionCost.create({ ...payload, date })
    return result
  } else {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Production Cost creation is only allowed for the current month',
    )
  }
}
const getProductionCost = async () => {
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

  const production = await ProductionCost.find({
    date: { $gte: startOfMonth, $lte: endOfMonth },
  }).sort({
    slNo: -1,
  })
  // await ProductionCost.deleteOne({ date: { $lt: startOfRange } })

  // Format the dates in the response
  const result = production.map(item => ({
    ...item.toObject(),
    date: format(item.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
  }))
  // // Calculate the total price
  const totalPrice = result.reduce(
    (sum, production) => sum + production.totalPrice,
    0,
  )

  return {
    result,
    totalPrice,
  }
}
const getTodayProductionCost = async (payload: string) => {
  // const now = new Date()
  // const date = new Date(payload.date)

  const now = payload ? new Date(payload) : new Date()

  // Set the start of the current day
  const startOfDay = new Date(now.setHours(0, 0, 0, 0))

  // Set the end of the current day
  const endOfDay = new Date(now.setHours(23, 59, 59, 999))

  const result = await ProductionCost.find({
    date: { $gte: startOfDay, $lte: endOfDay },
  })

  let data
  if (result.length > 0) {
    const unitPrice = result.reduce(
      (sum, production) => sum + production.unitPrice,
      0,
    )
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
const getSingleProductionCost = async (id: string) => {
  const result = ProductionCost.findById(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'ProductionCost not found')
  }

  return result
}

const UpdateProductionCost = async (
  payload: TProductionCostUpdate,
  id: string,
) => {
  let date
  if (payload?.date) {
    date = new Date(payload?.date)
  }
  const production = await ProductionCost.findById(id)

  if (!production) {
    throw new AppError(httpStatus.NOT_FOUND, 'ProductionCost not found')
  }
  const updatedProductionCost = await ProductionCost.findByIdAndUpdate(
    id,
    { ...payload, date },
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedProductionCost
}
const deletedProductionCost = async (id: string) => {
  const production = await ProductionCost.findById(id)
  if (!production) {
    throw new AppError(httpStatus.NOT_FOUND, 'Production Cost not found')
  }
  await ProductionCost.deleteOne({ _id: id })
}
export const productionCostService = {
  createProductionCost,
  getProductionCost,
  UpdateProductionCost,
  deletedProductionCost,
  getSingleProductionCost,
  getTodayProductionCost,
}
