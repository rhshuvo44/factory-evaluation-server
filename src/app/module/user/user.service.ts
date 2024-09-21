import AppError from '../../errors/AppError'
import { TUser, TUserUpdate } from './user.interface'
import { User } from './user.model'

const createUser = async (userData: TUser) => {
  const user = await User.findOne({ email: userData?.email })
  //! user check
  if (user) {
    throw new AppError(400, 'User already exists')
  }

  // Create a new user
  await User.create(userData)

  const newUser = await User.findOne({ email: userData?.email }).select(
    '-password',
  )
  return newUser
}
const allUsers = async () => {
  const users = await User.find().select('-password')
  //! user check
  if (!users) {
    throw new AppError(400, 'User not found')
  }

  return users
}
const updateUser = async (userData: TUserUpdate, id: string) => {
  const user = await User.findById(id)
  //! user check
  if (!user) {
    throw new AppError(400, 'User not found')
  }
  // Update  user data
  await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true })
  const userUpdate = await User.findById(id).select('-password')
  return userUpdate
}
const deleteUser = async (id: string) => {
  const user = await User.findById(id)
  //! user check
  if (!user) {
    throw new AppError(400, 'User not found')
  }
  // Update  user data
  await User.findByIdAndUpdate(id, {
    isDeleted: true,
    status: 'blocked',
  }, { new: true, runValidators: true })
  const userDelete = await User.findById(id).select('-password')
  return userDelete
}
export const userService = {
  createUser,
  allUsers,
  updateUser,
  deleteUser
}
