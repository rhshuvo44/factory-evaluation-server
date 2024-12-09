import { format } from 'date-fns'
import httpStatus from 'http-status'
import moment from 'moment'
import AppError from '../../errors/AppError'
import { TProductionReport } from '../productionReport/productionReport.interface'
import { ProductionReport } from '../productionReport/productionReport.model'
import { TOrder, TOrderUpdate } from './order.interface'
import { Order } from './order.model'

const createOrder = async (payload: TOrder) => {
  const orderDate = new Date(payload.orderDate)
  const shipmentDate = new Date(payload.shipmentDate)

  const result = await Order.create({ ...payload, orderDate, shipmentDate })
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
        orderDate: format(Order?.orderDate, 'dd-MM-yyyy'),
        shipmentDate: format(Order?.shipmentDate, 'dd-MM-yyyy'),
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
  // const data = await Order.find()
  // if (!data) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Data not found')
  // }
  // // Filter out orders where quantity equals packingComplete
  // // Extract the orderNo values into a flat array
  // const orderNo = data.map(Order => Order.orderNo)

  // // return orderNo

  // // / Fetch all relevant production reports in one query
  // const productionReports = await ProductionReport.find({ orderNo: { $in: orderNo } });

  // // Create a mapping of orderNo to production reports for quick lookup
  // // Create a mapping of orderNo to production reports for quick lookup
  // // Create a mapping of orderNo to production reports for quick lookup
  // const productionReportMap: { [key: string]: typeof ProductionReport } = productionReports.reduce((map, report) => {
  //   if (report.orderNo) {
  //     map[report.orderNo] = report;
  //   }
  //   return map;
  // }, {});

  // // Filter orders based on quantity and packingComplete conditions
  // const filteredOrders = data.filter(order => {
  //   const productionReport = productionReportMap[order.orderNo];
  //   return !productionReport || order.quantity !== productionReport.packingComplete;
  // }).map(order => order.orderNo);

  // return filteredOrders;
  const data: TOrder[] = await Order.find()
  if (!data || data.length === 0) {
    throw new AppError(404, 'Data not found')
  }

  // Extract the orderNo values into a flat array
  const orderNos: string[] = data.map(order => order.orderNo)

  // Fetch all relevant production reports in one query
  const productionReports: TProductionReport[] = await ProductionReport.find({
    orderNo: { $in: orderNos },
  })

  // Create a mapping of orderNo to production reports for quick lookup
  const productionReportMap: Record<string, TProductionReport> =
    productionReports.reduce(
      (map, report) => {
        if (report.orderNo) {
          map[report.orderNo] = report
        }
        return map
      },
      {} as Record<string, TProductionReport>,
    )

  // Filter orders based on quantity and packingComplete conditions
  const filteredOrders: string[] = data
    .filter(order => {
      const productionReport = productionReportMap[order.orderNo]
      return (
        !productionReport ||
        order.quantity !== productionReport?.packingCompleted
      )
    })
    .map(order => order.orderNo)

  return filteredOrders
}
const updateOrder = async (payload: TOrderUpdate, id: string) => {
  let orderDate
  if (payload?.orderDate) {
    orderDate = new Date(payload?.orderDate)
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
    { ...payload, orderDate, shipmentDate },
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
