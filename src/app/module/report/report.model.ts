import { model, Schema } from 'mongoose'
import { TReport } from './report.interface'

const reportSchema = new Schema<TReport>(
  {
    slNo: {
      type: Number,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    factoryRunningCost: { type: Number, required: true },
    factoryCollection: { type: Number, required: true },
    balance: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)
// Pre-save hook to generate slNo
reportSchema.pre<TReport>('save', async function (next) {
  if (this.date) {
    const lastEntry = await Report.findOne().sort({ slNo: -1 })
    this.slNo = lastEntry ? lastEntry.slNo + 1 : 1
  }
  next()
})
export const Report = model<TReport>('Report', reportSchema)
