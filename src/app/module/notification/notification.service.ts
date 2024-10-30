import { format } from 'date-fns'
import { ProductionReport } from '../productionReport/productionReport.model'
import { Report } from '../report/report.model'
import { TargetOutput } from '../Target&Output/target&Output.model'
import { TNotification } from './notification.interface'
import { Notification } from './notification.model'

const createNotification = async (payload: TNotification) => {
  const date = new Date(payload.date)
  const result = await Notification.create({ ...payload, date })
  return result
}
const getNotification = async () => {
  // Get the current date
  const now = new Date()
  // Calculate the first and last day of the current month

  const startOfRange = new Date(now)
  startOfRange.setDate(now.getDate() - 10)
  const previousDay = new Date(now)
  previousDay.setDate(now.getDate() - 1)

  const data = await Notification.find().sort({ slNo: -1 })
  await Notification.deleteOne({ date: { $lt: startOfRange } })

  let reminderNotifyReport = null
  const todayReportGenerate = await Report.findOne({
    date: previousDay.setHours(0, 0, 0, 0),
  })

  // If no report was generated today, set a reminder notification
  if (!todayReportGenerate) {
    reminderNotifyReport = {
      message: 'No report generated today.',
      date: format(now, 'dd-MM-yyyy'),
    }
  }
  let reminderNotifyProduction = null
  const todayProduction = await ProductionReport.findOne({
    date: previousDay.setHours(0, 0, 0, 0),
  })

  // If no report was generated today, set a reminder notification
  if (!todayProduction) {
    reminderNotifyProduction = {
      message: 'No Production report submit today.',
      date: format(now, 'dd-MM-yyyy'),
    }
  }
  let reminderNotifyTarget = null
  const todayTarget = await TargetOutput.findOne({
    date: previousDay.setHours(0, 0, 0, 0),
  })

  // If no report was generated today, set a reminder notification
  if (!todayTarget) {
    reminderNotifyTarget = {
      message: 'No Target Output report submit today.',
      date: format(now, 'dd-MM-yyyy'),
    }
  }

  // Format dates in notifications data
  const formattedData = data.map(item => ({
    ...item.toObject(),
    date: format(item.date, 'dd-MM-yyyy'),
  }))

  // Combine reminder notification and formatted data
  const combinedReport = reminderNotifyReport
    ? [reminderNotifyReport, ...formattedData]
    : formattedData
  const combinedProduction = reminderNotifyProduction
    ? [reminderNotifyProduction, ...combinedReport]
    : formattedData
  const combinedData = reminderNotifyTarget
    ? [reminderNotifyTarget, ...combinedProduction]
    : formattedData

  return {
    result: combinedData, // Return combined notifications
  }
}

export const notificationService = {
  createNotification,
  getNotification,
}
