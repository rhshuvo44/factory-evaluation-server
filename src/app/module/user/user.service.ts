import AppError from "../../errors/AppError"
import { TUser } from "./user.interface"
import { User } from "./user.model"

const createUser = async (userData: TUser) => {
    let user = await User.findOne({ email: userData?.email })
    //! user check 
    if (user) {
        throw new AppError(400, 'User already exists')
    }

    // Create a new user
    user = await User.create(userData)

    const newUser = await User.findOne({ email: userData?.email }).select(
        '-password',
    )
    return newUser

}

export const userService = {
    createUser,
}