import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'

const signup = catchAsync(async (req: Request, res: Response) => {
  const newUser = await userService.createUser(req?.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: newUser,
  })
})
const allUser = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.allUsers()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Users fetch successfully',
    data: users,
  })
})
const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logout successfully',
    data: {}
  })
})
export const userController = {
  signup,
  allUser,
  logout
}
