import { model, Schema } from 'mongoose'
import { fixedCostSub, TFixedCost } from './fixedCost.interface'

const fixedCostSubSchema = new Schema<fixedCostSub>(
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

const fixedCostSchema = new Schema<TFixedCost>(
  {
    slNo: {
      type: Number,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    factoryRent: [fixedCostSubSchema],
    honorary: [fixedCostSubSchema],
    factoryRevenue: [fixedCostSubSchema],
  },
  {
    timestamps: true,
  },
)
// Pre-save hook to generate slNo
fixedCostSchema.pre<TFixedCost>('save', async function (next) {
  if (this.date) {
    const lastEntry = await FixedCost.findOne().sort({ slNo: -1 })
    this.slNo = lastEntry ? lastEntry.slNo + 1 : 1
  }
  next()
})
export const FixedCost = model<TFixedCost>('FixedCost', fixedCostSchema)
