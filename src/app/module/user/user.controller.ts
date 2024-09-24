import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'
import { RequestHandler } from 'express'

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
  const user = await userService.deleteUser(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' User Update successfully',
    data: user,
  })
})
export const userController = {
  signup,
  allUser,
  logout,
  userUpdate,
  userDelete,
}
