import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'

const signup = catchAsync(async (req, res) => {
  const data = await userService.createUser(req?.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data,
  })
})
const allUser: RequestHandler = catchAsync(async (req, res) => {
  const data = await userService.allUsers(req?.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Users fetch successfully',
    data,
  })
})
const getMe = catchAsync(async (req, res) => {
  const { userId } = req.user
  const data = await userService.getMe(userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data,
  })
})
const logout = catchAsync(async (req, res) => {
  res.clearCookie('refreshToken')
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logout successfully',
    data: null,
  })
})
const userUpdate = catchAsync(async (req, res) => {
  const { id } = req.params
  const { body } = req
  const data = await userService.updateUser(body, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' User Update successfully',
    data,
  })
})
const userDelete = catchAsync(async (req, res) => {
  const { id } = req.params
  await userService.deleteUser(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' User Deleted successfully',
    data: null,
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
