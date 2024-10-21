import { model, Schema } from 'mongoose'
import { TSection, TTargetOutput } from './target&Output.interface'
const TSectionSchema = new Schema<TSection>(
  {
    target: { type: Number, required: true },
    wip: { type: Number, required: true },
    output: { type: Number, required: true },
  },
  { _id: false },
)
const targetOutputSchema = new Schema<TTargetOutput>(
  {
    slNo: { type: Number, unique: true },
    date: { type: Date, required: true },
    buyer: { type: String, required: true },
    orderNo: { type: Number, required: true },
    styleNo: {
      type: String,
      enum: [
        'hoody/jacket',
        'Leggins',
        'Polo Shirt',
        'T-Shirt',
        'Tank Top',
        'Sweat Shirt',
        'Trouser',
        'Shorts',
        'Romper/Keeper',
        'Long Sleeve T-shirt',
      ],
      required: true,
    },
    color: { type: String, required: true },
    orderQuantity: { type: Number, required: true },
    cuttingSection: [TSectionSchema],
    sewingSection: [TSectionSchema],
    finishing: [TSectionSchema],
    remark: { type: String },
  },
  {
    timestamps: true,
  },
)
// Pre-save hook to generate slNo
targetOutputSchema.pre<TTargetOutput>('save', async function (next) {
  if (this.date) {
    const lastEntry = await TargetOutput.findOne().sort({ slNo: -1 })
    this.slNo = lastEntry ? lastEntry.slNo + 1 : 1
  }
  next()
})
export const TargetOutput = model<TTargetOutput>(
  'TargetOutput',
  targetOutputSchema,
)
