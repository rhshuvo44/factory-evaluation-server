import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TTravel, TTravelUpdate } from './travel.interface'
import { Travel } from './travel.model'

const createTravelAllowance = async (payload: TTravel) => {
  /*
 //! TODO: must be imput everyday 
 input date and compare database input date if not insert previously date must be input previous date
 if insert previous date can insert currrent date 
  */
  const now = new Date()
  const date = new Date(payload.date)

  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)
  if (startOfRange <= date && date <= now) {
    const result = await Travel.create({ ...payload, date })
    return result
  } else {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Travel allowance creation is only allowed for the last 45 days',
    )
  }
}
const getTravelAllowance = async (query: Record<string, unknown>) => {
  // Get the current date
  const now = new Date()
  // Calculate the first and last day of the current month
  // const startOfMonth = format(
  //   new Date(now.getFullYear(), now.getMonth(), 1),
  //   'dd-MM-yyyy',
  // )

  // const endOfMonth = format(
  //   new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999),
  //   'dd-MM-yyyy',
  // )
  // Calculate the date 45 days ago
  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)

  // End date is the current date
  const endOfRange = new Date(now)

  const travelQuery = new QueryBuilder(
    Travel.find({ date: { $gte: startOfRange, $lte: endOfRange } }).sort({
      slNo: -1,
    }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()
  await Travel.deleteMany({ date: { $lt: startOfRange } })
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
const getTodayTravellingAllowance = async () => {
  const now = new Date()

  // Set the start of the current day
  const startOfDay = new Date(now.setHours(0, 0, 0, 0))

  // Set the end of the current day
  const endOfDay = new Date(now.setHours(23, 59, 59, 999))

  const result = await Travel.find({
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
