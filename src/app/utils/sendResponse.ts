import { Response } from 'express'
type TMeta = {
  limit: number
  page: number
  total: number
  totalPage: number
}
type TResponse<T> = {
  statusCode: number
  success: boolean
  message?: string
  data: T
  meta?: TMeta
  totalPrice?: number
  token?: string
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    data: data?.data,
    token: data?.token,
    meta: data?.meta,
    totalPrice: data?.totalPrice,
  })
}

export default sendResponse
