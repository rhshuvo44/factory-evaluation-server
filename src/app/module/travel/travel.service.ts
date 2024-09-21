import { format } from 'date-fns'
import QueryBuilder from '../../builder/QueryBuilder'
import { TTravel, TTravelUpdate } from './travel.interface'
import { Travel } from './travel.model'

const createTravelAllowance = async (travelData: TTravel) => {
  const TravelAllowance = await Travel.create(travelData)
  return TravelAllowance
}
const getTravelAllowance = async (query: Record<string, unknown>) => {
  // Get the current date
  const now = new Date()
  // Calculate the first and last day of the current month
  const startOfMonth = format(new Date(now.getFullYear(), now.getMonth(), 1), 'dd-MM-yyyy')

  const endOfMonth = format(new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  ), 'dd-MM-yyyy')
  const travelQuery = new QueryBuilder(
    Travel.find({ date: { $gte: startOfMonth, $lte: endOfMonth } }),
    query

  ).filter()
    .sort()
    .paginate()
    .fields();

  const meta = await travelQuery.countTotal();
  const result = await travelQuery.modelQuery;


  // Format the dates in the response

  // // Calculate the total price
  const totalPrice = result.reduce(
    (sum, travel) => sum + travel.totalPrice,
    0,
  )

  return {
    meta,
    result,
    totalPrice,
  }
}

const UpdateTravelAllowance = async (travelData: TTravelUpdate, id: string) => {
  const updatedTravelAllowance = await Travel.findByIdAndUpdate(
    id,
    travelData,
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedTravelAllowance
}
export const TravelService = {
  createTravelAllowance,
  getTravelAllowance,
  UpdateTravelAllowance,
}
