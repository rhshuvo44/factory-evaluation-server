import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TTravel, TTravelUpdate } from './travel.interface'
import { Travel } from './travel.model'

const createTravelAllowance = async (payload: TTravel) => {
  const date = new Date(payload.date)
  const result = await Travel.create({ ...payload, date })
  return result
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
  const travelQuery = new QueryBuilder(
    Travel.find({ date: { $gte: startOfMonth, $lte: endOfMonth } }).sort({
      slNo: 1,
    }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

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
}
