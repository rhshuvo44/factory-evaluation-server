import { format } from 'date-fns'
import QueryBuilder from '../../builder/QueryBuilder'
import { TTravel, TTravelUpdate } from './travel.interface'
import { Travel } from './travel.model'

const createTravelAllowance = async (travelData: TTravel) => {
  const date = new Date(travelData.date)
  const TravelAllowance = await Travel.create({ ...travelData, date })
  return TravelAllowance
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
    Travel.find({ date: { $gte: startOfMonth, $lte: endOfMonth } }),
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

const UpdateTravelAllowance = async (travelData: TTravelUpdate, id: string) => {
  let date
  if (travelData?.date) {
    date = new Date(travelData?.date)
  }
  const updatedTravelAllowance = await Travel.findByIdAndUpdate(
    id,
    { ...travelData, date },
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedTravelAllowance
}
const deletedTravelAllowance = async (id: string) => {
  await Travel.deleteOne({ _id: id })
}
export const TravelService = {
  createTravelAllowance,
  getTravelAllowance,
  UpdateTravelAllowance,
  deletedTravelAllowance,
}
