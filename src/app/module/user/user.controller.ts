import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'

const signup = catchAsync(async (req, res) => {
  const newUser = await userService.createUser(req?.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: newUser,
  })
})
const allUser: RequestHandler = catchAsync(async (req, res) => {
  const users = await userService.allUsers(req?.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Users fetch successfully',
    data: users,
  })
})
const getMe = catchAsync(async (req, res) => {
  const { userId } = req.user
  const result = await userService.getMe(userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  })
})
const logout = catchAsync(async (req, res) => {
  res.clearCookie('refreshToken')
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logout successfully',
    data: {},
  })
})
const userUpdate = catchAsync(async (req, res) => {
  const { id } = req.params
  const { body } = req
  const user = await userService.updateUser(body, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' User Update successfully',
    data: user,
  })
})
const userDelete = catchAsync(async (req, res) => {
  const { id } = req.params
  await userService.deleteUser(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' User Deleted successfully',
    data: {},
  })
})
export const userController = {
  signup,
  allUser,
  logout,
  userUpdate,
  userDelete,
  getMe,
}
