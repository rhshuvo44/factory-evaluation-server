import { format } from 'date-fns'
import QueryBuilder from '../../builder/QueryBuilder'
import { TMiscellaneous, TMiscellaneousUpdate } from './miscellaneous.interface'
import { Miscellaneous } from './miscellaneous.model'

const createMiscellaneous = async (miscellaneousData: TMiscellaneous) => {
  const date = new Date(miscellaneousData.date)

  const miscellaneous = await Miscellaneous.create({
    ...miscellaneousData,
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
  miscellaneousData: TMiscellaneousUpdate,
  id: string,
) => {
  let date
  if (miscellaneousData?.date) {
    date = new Date(miscellaneousData?.date)
  }
  const updatedMiscellaneous = await Miscellaneous.findByIdAndUpdate(
    id,
    { ...miscellaneousData, date },
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedMiscellaneous
}
const deletedMiscellaneous = async (id: string) => {
  await Miscellaneous.deleteOne({ _id: id })
}
export const miscellaneousService = {
  createMiscellaneous,
  getMiscellaneous,
  UpdateMiscellaneous,
  deletedMiscellaneous,
}
