import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
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
const allUsers = async (query: Record<string, unknown>) => {
  const dataQuery = new QueryBuilder(User.find().select('-password'), query)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await dataQuery.countTotal()
  const result = await dataQuery.modelQuery

  //! user check
  if (!result) {
    throw new AppError(400, 'User not found')
  }

  return {
    meta,
    result,
  }
}
const getMe = async (userId: string) => {
  const user = await User.findById(userId).select('-password')
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }
  return user
}

const getSingleUser = async (id: string) => {
  const user = await User.findById(id).select('-password')
  //! user check
  if (!user) {
    throw new AppError(400, 'User not found')
  }
  return user
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
  await User.deleteOne({ _id: id })
}
export const userService = {
  createUser,
  allUsers,
  updateUser,
  deleteUser,
  getMe,
  getSingleUser,
}
