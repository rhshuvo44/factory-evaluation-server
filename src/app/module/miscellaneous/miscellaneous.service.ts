import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TMiscellaneous, TMiscellaneousUpdate } from './miscellaneous.interface'
import { Miscellaneous } from './miscellaneous.model'

const createMiscellaneous = async (payload: TMiscellaneous) => {
  /*
  //! TODO: must be input everyday 
  input date and compare database input date if not insert previously date must be input previous date
  if insert previous date can insert current date 
   */
  const now = new Date()
  const date = new Date(payload.date)

  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)
  if (startOfRange <= date && date <= now) {
    const result = await Miscellaneous.create({ ...payload, date })
    return result
  } else {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Data creation is only allowed for the last 45 days',
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
  const endOfRange = new Date(now)

  const dataQuery = new QueryBuilder(
    Miscellaneous.find({
      date: { $gte: startOfRange, $lte: endOfRange },
    }).sort({
      slNo: -1,
    }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()
  await Miscellaneous.deleteMany({ date: { $lt: startOfRange } })

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

  const result = await Miscellaneous.findOne({
    date: { $gte: startOfDay, $lte: endOfDay },
  })
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  return result
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
