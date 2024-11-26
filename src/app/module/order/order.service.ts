import httpStatus from 'http-status'
import moment from 'moment'
import AppError from '../../errors/AppError'
import { TOrder, TOrderUpdate } from './order.interface'
import { Order } from './order.model'

const createOrder = async (payload: TOrder) => {
  const date = new Date(payload.date)
  const shipmentDate = new Date(payload.shipmentDate)

  const result = await Order.create({ ...payload, date, shipmentDate })
  return result
}
const getOrder = async () => {
  const today = moment()
  const Orders = await Order.find()

  if (!Orders) {
    throw new Error('No Orders found')
  }
  // Process each Order to calculate and update lead time
  const result = await Promise.all(
    Orders.map(async Order => {
      const leadTime = moment(Order.shipmentDate).diff(today, 'days') // Calculate lead time in days
      const updatedLeadTime = leadTime > 0 ? `${leadTime} days` : 'Expired' // If lead time is <= 0, mark it as expired
      // Update leadTime in the database
      Order.leadTime = updatedLeadTime
      await Order.save() // Save changes to the database

      // Return the transformed Order object
      return {
        ...Order.toObject(),
        leadTime: updatedLeadTime,
        date: moment(Order.date).format('YYYY-MM-DD'), // Format date
        shipmentDate: moment(Order.shipmentDate).format('YYYY-MM-DD'), // Format shipment date
      }
    }),
  )
  return result
}

// const getToday = async (payload: string) => {
//   const now = payload ? new Date(payload) : new Date()

//   // Set the start of the current day
//   const startOfDay = new Date(now.setHours(0, 0, 0, 0))

//   // Set the end of the current day
//   const endOfDay = new Date(now.setHours(23, 59, 59, 999))

//   const result = await Order.find({
//     date: { $gte: startOfDay, $lte: endOfDay },
//   })
//   let data
//   if (result.length > 0) {
//     // If records are found, map the results to the desired format
//     // const totalPrice = result.reduce((sum, data) => sum + data.totalPrice, 0)
//     const unitPrice = result.reduce((sum, data) => sum + data.unitPrice, 0)
//     return (data = {
//       slNo: 1,
//       date: format(startOfDay, 'dd-MM-yyyy'),
//       particulars: '',
//       description: '-',
//       remark: '-',
//       quantity: '-',
//       OrderId: '-',
//       orderNo: '-',
//       memoNo: '-',
//       payTo: '-',
//       paymentType: 'Once',
//       unit: 'Day',
//       unitPrice: unitPrice,
//       totalPrice: '-',
//     })
//   } else {
//     // If no records are found, set default data structure
//     data = {
//       slNo: 1,
//       date: format(startOfDay, 'dd-MM-yyyy'),
//       particulars: '',
//       description: '-',
//       remark: '-',
//       quantity: '-',
//       OrderId: '-',
//       orderNo: '-',
//       memoNo: '-',
//       payTo: '-',
//       paymentType: 'Once',
//       unit: 'Day',
//       unitPrice: 0,
//       totalPrice: '-',
//     }
//   }
//   return data
// }
const getSingleOrder = async (orderNo: string) => {
  const data = await Order.findOne({ orderNo: orderNo })
  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  return data
}
const getOrderNumber = async () => {
  const data = await Order.find()
  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  // Extract the orderNo values into a flat array
  const orderNo = data.map(Order => Order.orderNo)
  return orderNo
}
const updateOrder = async (payload: TOrderUpdate, id: string) => {
  let date
  if (payload?.date) {
    date = new Date(payload?.date)
  }
  let shipmentDate
  if (payload?.shipmentDate) {
    shipmentDate = new Date(payload?.shipmentDate)
  }
  const data = await Order.findById(id)
  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  const result = await Order.findByIdAndUpdate(
    id,
    { ...payload, date, shipmentDate },
    {
      new: true,
      runValidators: true,
    },
  )
  return result
}
const deletedOrder = async (id: string) => {
  const data = await Order.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  }
  await Order.deleteOne({ _id: id })
}
export const orderService = {
  createOrder,
  getOrder,
  updateOrder,
  deletedOrder,
  getSingleOrder,
  getOrderNumber,
  // getToday,
}
