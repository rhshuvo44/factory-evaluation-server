import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import AppError from '../../errors/AppError'
import { sendEmail } from '../../utils/sendEmail'
import { User } from '../user/user.model'
import { TLogin } from './auth.interface'
import { createToken, verifyToken } from './auth.utils'

const loginUser = async (userData: TLogin) => {
  const { userName, password } = userData

  // Check if the user exists
  const user = await User.findOne({ userName })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked

  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  //checking if the password is correct

  // Check the password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match')
  }

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string)

  const { userId, iat } = decoded

  // checking if the user is exist
  const user = await User.findById(userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
  }
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    accessToken,
  }
}
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.findById(userData.userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked

  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  //checking if the password is correct

  // Check the password
  const isMatch = await bcrypt.compare(payload.oldPassword, user.password)
  if (!isMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match')
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )
  await User.findOneAndUpdate(
    {
      _id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  )
  return null
}

const forgetPassword = async (email: string) => {
  // checking if the user is exist
  const user = await User.findOne({ email })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  )

  const resetUILink = `${config.reset_pass_ui_link}?email=${user.email}&token=${resetToken} `

  sendEmail(user.email, resetUILink)

  console.log(resetUILink)
}
const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload.email })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload

  //localhost:3000?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4

  if (user._id.toString() !== decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!')
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findOneAndUpdate(
    {
      _id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  )
}

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
}
