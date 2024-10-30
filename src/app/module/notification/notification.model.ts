import { model, Schema } from 'mongoose'
import { TNotification } from './notification.interface'

const notificationSchema = new Schema<TNotification>(
  {
    slNo: { type: Number, unique: true },
    date: { type: Date, required: true },
    message: {
      type: String,

      required: true,
    },
  },
  {
    timestamps: true,
  },
)
// Pre-save hook to generate slNo
notificationSchema.pre<TNotification>('save', async function (next) {
  if (this.date) {
    const lastEntry = await Notification.findOne().sort({ slNo: -1 })
    this.slNo = lastEntry ? lastEntry.slNo + 1 : 1
  }
  next()
})
export const Notification = model<TNotification>(
  'Notification',
  notificationSchema,
)
