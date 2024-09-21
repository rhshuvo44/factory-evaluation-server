import { format } from 'date-fns'
import { TTravel, TTravelUpdate } from './travel.interface'
import { Travel } from './travel.model'

const createTravelAllowance = async (travelData: TTravel) => {
  const TravelAllowance = await Travel.create(travelData)
  return TravelAllowance
}
const getTravelAllowance = async () => {
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
  // Query the database for payments within the current month
  const monthlyTravellingAllowance = await Travel.find({
    date: { $gte: startOfMonth, $lte: endOfMonth },
  })
  // Format the dates in the response
  const monthlyTravellingAllowanceWithDateFormart =
    monthlyTravellingAllowance.map(travel => ({
      ...travel.toObject(),
      date: format(travel.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
    }))
  // Calculate the total price
  const totalPrice = monthlyTravellingAllowance.reduce(
    (sum, travel) => sum + travel.totalPrice,
    0,
  )

  return {
    travellingAllowance: monthlyTravellingAllowanceWithDateFormart,
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
