import { model, Schema } from 'mongoose'
import { TUtility, utilities } from './utilityBill.interface'

const utilitiesSchema = new Schema<utilities>(
  {
    unitPrice: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
  },
  { _id: false },
)

const utilitySchema = new Schema<TUtility>(
  {
    slNo: {
      type: Number,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    internet: [utilitiesSchema],
    water: [utilitiesSchema],
    electricity: [utilitiesSchema],
    others: [utilitiesSchema],
  },
  {
    timestamps: true,
  },
)
// Pre-save hook to generate slNo
utilitySchema.pre<TUtility>('save', async function (next) {
  if (this.date) {
    // Generate slNo
    const lastEntry = await Utility.findOne().sort({ slNo: -1 })
    this.slNo = lastEntry ? lastEntry.slNo + 1 : 1
  }
  next()
})
export const Utility = model<TUtility>('Utility', utilitySchema)
