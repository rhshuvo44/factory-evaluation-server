import { model, Schema } from 'mongoose'
import { TToDayReport } from './productionReport.interface'

const toDayReportSchema = new Schema<TToDayReport>(
  {
    orderNo: { type: String, required: true },
    styleNo: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, required: true },
    cuttingCompleted: { type: Number, required: true },
    printCompleted: { type: Number, required: true },
    sewingOutput: { type: Number, required: true },
    finishingOutput: { type: Number, required: true },
    packingCompleted: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)

export const ToDayReport = model<TToDayReport>('ToDayReport', toDayReportSchema)
