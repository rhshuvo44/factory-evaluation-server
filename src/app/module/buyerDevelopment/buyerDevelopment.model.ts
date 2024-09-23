import { model, Schema } from 'mongoose'
import { TBuyerDevelopment } from './buyerDevelopment.interface'

const buyerDevelopmentSchema = new Schema<TBuyerDevelopment>(
  {
    slNo: { type: Number, unique: true },
    date: { type: Date, required: true },
    particulars: {
      type: String,
      enum: [
        'Commission',
        'Meal cost',
        'Machine Maintenance',
        'Loading & Unloading',
        'Rental Machine Bill',
        'Sample Development cost',
        'Night Bill (STF)',
        'Night Bill (WRK)',
      ],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number },
    memoNo: { type: Number },
    buyerId: { type: Number },
    orderNo: {
      type: Number,
    },
    payTo: {
      type: String,
      required: true,
    },
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
buyerDevelopmentSchema.pre<TBuyerDevelopment>('save', async function (next) {
  if (this.date) {
    const lastEntry = await BuyerDevelopment.findOne().sort({ slNo: -1 })
    this.slNo = lastEntry ? lastEntry.slNo + 1 : 1
  }
  next()
})
export const BuyerDevelopment = model<TBuyerDevelopment>(
  'BuyerDevelopment',
  buyerDevelopmentSchema,
)
