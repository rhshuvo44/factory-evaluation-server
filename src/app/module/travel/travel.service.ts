import { TTravel } from './travel.interface'
import { Travel } from './travel.model'

const createTravelAllowance = async (travelData: TTravel) => {
    const TravelAllowance = await Travel.create(travelData)
    return TravelAllowance
}
const getTravelAllowance = async () => {
    // Get the current date
    const now = new Date();
    // Calculate the first and last day of the current month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    // Query the database for payments within the current month
    const monthlyTravellingAllowance = await Travel.find({
        date: { $gte: startOfMonth, $lte: endOfMonth }
    });


    return monthlyTravellingAllowance
}

export const TravelService = {
    createTravelAllowance,
    getTravelAllowance,
}
