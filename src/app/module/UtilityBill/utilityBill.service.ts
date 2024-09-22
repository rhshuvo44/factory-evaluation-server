import { format } from 'date-fns'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TUtility, TUtilityUpdate } from './utilityBill.interface'
import { Utility } from './utilityBill.model'

const createUtility = async (payload: TUtility) => {
  const date = new Date(payload.date)
  const result = await Utility.create({ ...payload, date })
  return result
}
const getUtility = async (query: Record<string, unknown>) => {
  // Get the current date
  const now = new Date()
  // Calculate the first and last day of the current month

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
    Utility.find({ date: { $gte: startOfMonth, $lte: endOfMonth } }).sort({ slNo: 1 }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await dataQuery.countTotal()
  const data = await dataQuery.modelQuery

  const result = data.map(item => ({
    ...item.toObject(),
    date: format(item.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
  }))


  return {
    meta,
    result
  }
}
const updateUtility = async (payload: TUtilityUpdate, id: string) => {

  const data = await Utility.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  const result = await Utility.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    },
  )
  return result
}
export const utilityService = {
  createUtility,
  getUtility, updateUtility
}
