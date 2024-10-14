import { Request, Response } from 'express'
import httpStatus from 'http-status'
import config from '../../config'
import AppError from '../../errors/AppError'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body)
  const { refreshToken, accessToken } = result

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {},
    token: accessToken,
  })
})
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body

  const data = await AuthServices.changePassword(req.user, passwordData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated successfully!',
    data,
  })
})
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const data = await AuthServices.refreshToken(refreshToken)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data,
  })
})
const forgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body
  const data = await AuthServices.forgetPassword(email)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated successfully!',
    data,
  })
})
const resetPassword = catchAsync(async (req, res) => {
  // const token = req.headers.authorization
  const authHeader = req.headers['authorization']
  // const token = authorization.split(' ')[1]
  let token
  if (authHeader) {
    // Split the Authorization header to get the token part
    token = authHeader.split(' ')[1]
  }

  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !')
  }

  const result = await AuthServices.resetPassword(req.body, token)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully!',
    data: result,
  })
})

export const AuthControllers = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
}
