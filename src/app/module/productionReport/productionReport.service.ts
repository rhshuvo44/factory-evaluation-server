import { format } from 'date-fns'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import {
  TProductionReport,
  TProductionReportUpdate,
} from './productionReport.interface'
import { ProductionReport } from './productionReport.model'
import { ToDayReport } from './toDayReport.model'

const createProductionReport = async (payload: TProductionReport) => {
  // const date = new Date(payload.date)
  // const shipmentDate = new Date(payload.shipmentDate)
  // const orderDate = new Date(payload.orderDate)

  // const result = await ProductionReport.create({
  //   ...payload,
  //   date,
  //   shipmentDate,
  //   orderDate,
  // })
  const date = new Date(payload.date)
  const shipmentDate = new Date(payload.shipmentDate)
  const orderDate = new Date(payload.orderDate)
  // Set the start and end of the day for the given date
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  const previousDay = new Date(date)
  previousDay.setDate(date.getDate() - 1)
  // Check for an existing record with the same `date`, `styleNo`, and `orderNo`
  const existingReport = await ProductionReport.findOne({
    date: {
      $gte: startOfDay, // Start of the day
      $lt: endOfDay, // End of the day
    },
    styleNo: payload.styleNo,
    orderNo: payload.orderNo,
  })
  const existingReportForToday = await ProductionReport.findOne({
    styleNo: payload.styleNo,
    orderNo: payload.orderNo,
  }).sort({ _id: -1 })

  if (existingReport) {
    throw new AppError(
      400,
      'A production report with the same date, styleNo, and orderNo already exists for today.',
    )
  }
  // Create a new production report
  const result = await ProductionReport.create({
    ...payload,
    date,
    shipmentDate,
    orderDate,
  })

  if (existingReportForToday) {
    // Calculate the difference in cuttingCompleted
    const cuttingCompletedDifference =
      payload.cuttingCompleted - existingReportForToday.cuttingCompleted
    const printCompletedDifference =
      payload.printCompleted - existingReportForToday.printCompleted
    const sewingOutputDifference =
      payload.sewingOutput - existingReportForToday.sewingOutput
    const finishingOutputDifference =
      payload.finishingOutput - existingReportForToday.finishingOutput
    const packingCompletedDifference =
      payload.packingCompleted - existingReportForToday.packingCompleted

    // Create a new ToDayReport with the calculated values
    await ToDayReport.create({
      orderNo: payload.orderNo,
      styleNo: payload.styleNo,
      quantity: payload.quantity,
      cuttingCompleted: cuttingCompletedDifference,
      printCompleted: printCompletedDifference,
      sewingOutput: sewingOutputDifference,
      finishingOutput: finishingOutputDifference,
      packingCompleted: packingCompletedDifference,
      date,
    })
  } else {
    // If no existing report found, create the ToDayReport normally
    await ToDayReport.create({
      orderNo: payload.orderNo,
      styleNo: payload.styleNo,
      quantity: payload.quantity,
      cuttingCompleted: payload.cuttingCompleted,
      printCompleted: payload.printCompleted,
      sewingOutput: payload.sewingOutput,
      finishingOutput: payload.finishingOutput,
      packingCompleted: payload.packingCompleted,
      date,
    })
  }

  return result
}
const getProductionReport = async () => {
  // Get the current date
  const now = new Date()

  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 45)

  // End date is the current date
  // const endOfRange = new Date(now)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  )

  const data = await ProductionReport.find({
    date: { $gte: startOfMonth, $lte: endOfMonth },
  }).sort({ createdAt: -1 })
  // await ProductionReport.deleteOne({ date: { $lt: startOfRange } })

  const result = data.map(item => ({
    ...item.toObject(),
    date: format(item?.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
    orderDate: format(item?.orderDate, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
    shipmentDate: format(item?.shipmentDate, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
  }))
  return {
    result,
  }
}
const getToday = async (payload: string) => {
  const now = payload ? new Date(payload) : new Date()

  // Set the start of the current day
  const startOfDay = new Date(now.setHours(0, 0, 0, 0))

  // Set the end of the current day
  const endOfDay = new Date(now.setHours(23, 59, 59, 999))

  const result = await ToDayReport.find({
    date: { $gte: startOfDay, $lte: endOfDay },
  })
  let data
  const totalCuttingCompleted = result.reduce(
    (sum, data) => sum + data.cuttingCompleted,
    0,
  )
  const totalSewingOutput = result.reduce(
    (sum, data) => sum + data.sewingOutput,
    0,
  )
  const totalFinishingOutput = result.reduce(
    (sum, data) => sum + data.finishingOutput,
    0,
  )
  const totalPackingCompleted = result.reduce(
    (sum, data) => sum + data.packingCompleted,
    0,
  )
  if (result.length > 0) {
    // If records are found, map the results to the desired format
    data = result.map(item => ({
      date: format(item?.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
      orderNo: item?.orderNo,
      styleNo: item?.styleNo,
      quantity: item?.quantity,
      cuttingCompleted: item?.cuttingCompleted,
      printCompleted: item?.printCompleted,
      sewingOutput: item?.sewingOutput,
      finishingOutput: item?.finishingOutput,
      packingCompleted: item?.packingCompleted,
    }))
  } else {
    // If no records are found, set default data structure
    data = [
      {
        date: format(startOfDay, 'dd-MM-yyyy'),
        orderNo: 0,
        styleNo: 0,
        quantity: 0,
        cuttingCompleted: 0,
        printCompleted: 0,
        sewingOutput: 0,
        finishingOutput: 0,
        packingCompleted: 0,
      },
    ]
  }
  return {
    data,
    totalCuttingCompleted,
    totalSewingOutput,
    totalFinishingOutput,
    totalPackingCompleted,
  }
}
const getSingleProductionReport = async (id: string) => {
  const data = await ProductionReport.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'data not found')
  }

  return data
}
const getOrderNoProductionReport = async (orderNo: string) => {
  const data = await ProductionReport.findOne({ orderNo: orderNo }).sort({
    date: -1,
  })
  if (!data) {
    return null;
  }
  return {
    ...data.toObject(), // Convert Mongoose document to a plain object
    date: format(data.date, 'dd-MM-yyyy'),
  }
}
const UpdateProductionReport = async (
  payload: TProductionReportUpdate,
  id: string,
) => {
  let date
  if (payload?.date) {
    date = new Date(payload?.date)
  }
  let orderDate
  if (payload?.orderDate) {
    orderDate = new Date(payload?.orderDate)
  }
  let shipmentDate
  if (payload?.shipmentDate) {
    shipmentDate = new Date(payload?.shipmentDate)
  }
  const data = await ProductionReport.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'data not found')
  }

  const toDayReport = await ToDayReport.findOne({
    orderNo: data?.orderNo,
    styleNo: data.styleNo,
  })
  const updatedProductionReport = await ProductionReport.findByIdAndUpdate(
    id,
    { ...payload, date, orderDate, shipmentDate },
    {
      new: true,
      runValidators: true,
    },
  )
  await ToDayReport.findByIdAndUpdate(
    toDayReport?._id,
    {
      orderNo: payload.orderNo,
      styleNo: payload.styleNo,
      quantity: payload.quantity,
      cuttingCompleted: payload.cuttingCompleted,
      printCompleted: payload.printCompleted,
      sewingOutput: payload.sewingOutput,
      finishingOutput: payload.finishingOutput,
      packingCompleted: payload.packingCompleted, date
    },
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedProductionReport
}
const deletedProductionReport = async (id: string) => {
  const data = await ProductionReport.findById(id)

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'data not found')
  }
  const toDayReport = await ToDayReport.findOne({
    date: data?.date,
    orderNo: data?.orderNo,
    styleNo: data?.styleNo,
  })
  await ProductionReport.deleteOne({ _id: id })
  await ToDayReport.deleteOne({ _id: toDayReport?._id })
}
export const productionReportService = {
  createProductionReport,
  getProductionReport,
  UpdateProductionReport,
  deletedProductionReport,
  getSingleProductionReport,
  getToday,
  getOrderNoProductionReport,
}
