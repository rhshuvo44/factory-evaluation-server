import { model, Schema } from 'mongoose'
import { TProductionReport } from './productionReport.interface'

const productionReportSchema = new Schema<TProductionReport>(
  {
    orderNo: { type: String, required: true, unique: true },
    buyer: { type: String, required: true },
    styleNo: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, required: true },
    shipmentDate: { type: Date, required: true },
    leadTime: { type: String, required: true },
    fabricConsumption: { type: Number, required: true },
    totalFabric: { type: Number, required: true },
    fabricInHouse: { type: Number, required: true },
    requiredFabric: { type: Number, required: true },
    cuttingCompleted: { type: Number, required: true },
    cuttingRequired: { type: Number, required: true },
    deliveryToPrint: { type: Number, required: true },
    deliveryToPrintRemaining: { type: Number, required: true },
    printCompleted: { type: Number, required: true },
    printReceivable: { type: Number, required: true },
    sewingInput: { type: Number, required: true },
    sewingInputRemaining: { type: Number, required: true },
    sewingOutput: { type: Number, required: true },
    sewingOutputRemaining: { type: Number, required: true },
    finishingOutput: { type: Number, required: true },
    finishingOutputRemaining: { type: Number, required: true },
    packingCompleted: { type: Number, required: true },
    packingRemaining: { type: Number, required: true },
    remark: { type: String },
  },
  {
    timestamps: true,
  },
)
// Pre-save hook to generate slNo

export const ProductionReport = model<TProductionReport>(
  'ProductionReport',
  productionReportSchema,
)
