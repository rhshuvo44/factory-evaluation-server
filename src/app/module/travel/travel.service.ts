import AppError from '../../errors/AppError'
import { TTravel } from './travel.interface'
import { Travel } from './travel.model'

const createTravelAllowance = async (travelData: TTravel) => {


    const TravelAllowance = await Travel.create(travelData)


    return TravelAllowance
}
const getTravelAllowance = async () => {
    const user = await Travel.find().select('-password')
    //! user check
    if (!user) {
        throw new AppError(400, 'User not found')
    }

    return user
}

export const TravelService = {
    createTravelAllowance,
    getTravelAllowance,
}
