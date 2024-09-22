import { model, Schema } from 'mongoose'
import { TFactoryDevelopment } from './factoryDevelopment.interface'

const FactoryDevelopmentSchema = new Schema<TFactoryDevelopment>(
  {
    slNo: { type: Number, unique: true },
    date: { type: Date, required: true },
    particulars: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number },
    memoNo: { type: Number },
    orderedBy: {
      type: String,
      enum: ['M.D', 'Chairman'],
      required: true,
    },
    payTo: {
      type: String,
      enum: ['M.D', 'Chairman', 'Sarkar Alliance OPC'],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ['Bank', 'Cash'],
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
FactoryDevelopmentSchema.pre<TFactoryDevelopment>(
  'save',
  async function (next) {
    if (this.date) {
      const lastEntry = await FactoryDevelopment.findOne().sort({ slNo: -1 })
      this.slNo = lastEntry ? lastEntry.slNo + 1 : 1
    }
    next()
  },
)
export const FactoryDevelopment = model<TFactoryDevelopment>(
  'FactoryDevelopment',
  FactoryDevelopmentSchema,
)
