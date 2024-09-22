import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TMiscellaneous, TMiscellaneousUpdate } from './miscellaneous.interface'
import { Miscellaneous } from './miscellaneous.model'

const createMiscellaneous = async (payload: TMiscellaneous) => {
  const date = new Date(payload.date)

  const miscellaneous = await Miscellaneous.create({
    ...payload,
    date,
  })
  return miscellaneous
}
const getMiscellaneous = async (query: Record<string, unknown>) => {
  // Get the current date
  const now = new Date()
  // Calculate the first and last day of the current month

  // const startOfMonth = format(
  //     new Date(now.getFullYear(), now.getMonth(), 1),
  //     'dd-MM-yyyy',
  // )
  // const endOfMonth = format(
  //     new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999),
  //     'dd-MM-yyyy',
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
  const miscellaneousQuery = new QueryBuilder(
    Miscellaneous.find({ date: { $gte: startOfMonth, $lte: endOfMonth } }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await miscellaneousQuery.countTotal()
  const miscellaneous = await miscellaneousQuery.modelQuery
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
}
