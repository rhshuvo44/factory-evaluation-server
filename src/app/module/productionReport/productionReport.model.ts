import { model, Schema } from 'mongoose'
import { TProductionReport, TSection } from './productionReport.interface'
const TSectionSchema = new Schema<TSection>(
  {
    target: { type: Number, required: true },
    wip: { type: Number, required: true },
    output: { type: Number, required: true },
  },
  { _id: false },
)
const productionReportSchema = new Schema<TProductionReport>(
  {
    slNo: { type: Number, unique: true },
    date: { type: Date, required: true },
    lineNo: {
      type: String,
      enum: ['line 1 / 3rd floor', 'line 2 / 4th floor', 'line 3 / 4th floor'],
      required: true,
    },
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
    readyQuantity: { type: Number, required: true },
    cuttingSection: [TSectionSchema],
    sellingSection: [TSectionSchema],
    finishing: [TSectionSchema],
    remark: { type: String, optional: true },
  },
  {
    timestamps: true,
  },
)
// Pre-save hook to generate slNo
productionReportSchema.pre<TProductionReport>('save', async function (next) {
  if (this.date) {
    const lastEntry = await ProductionReport.findOne().sort({ slNo: -1 })
    this.slNo = lastEntry ? lastEntry.slNo + 1 : 1
  }
  next()
})
export const ProductionReport = model<TProductionReport>(
  'ProductionReport',
  productionReportSchema,
)
