import AppError from '../../errors/AppError'
import { TUser } from './user.interface'
import { User } from './user.model'

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
const allUsers = async () => {
  const user = await User.find().select('-password')
  //! user check
  if (!user) {
    throw new AppError(400, 'User not found')
  }

  return user
}

export const userService = {
  createUser,
  allUsers,
}
