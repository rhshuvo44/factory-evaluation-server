import { model, Schema } from 'mongoose'
import { TTravel } from './travel.interface'

const TravelSchema = new Schema<TTravel>(
  {
    slNo: { type: Number, unique: true },
    date: { type: Date, required: true },
    particulars: { type: String, required: true },
    description: { type: String, required: true },
    remark: { type: String, required: true },
    buyerId: { type: Number, required: true },
    orderNo: { type: Number, required: true },
    memoNo: { type: Number, required: true },
    payTo: { type: String, required: true },
    paymentType: {
      type: String,
      enum: ['Monthly', 'Daily', 'Once'],
      required: true,
    },
    unit: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)
// Pre-save hook to generate slNo
TravelSchema.pre<TTravel>('save', async function (next) {
  if (this.date) {
    const lastEntry = await Travel.findOne().sort({ slNo: -1 })
    this.slNo = lastEntry ? lastEntry.slNo + 1 : 1
  }
  next()
})
export const Travel = model<TTravel>('Travel', TravelSchema)
