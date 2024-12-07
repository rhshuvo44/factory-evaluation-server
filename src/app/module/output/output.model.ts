import { model, Schema } from 'mongoose'
import { TOutput } from './output.interface'

const outputSchema = new Schema<TOutput>(
  {
    date: { type: Date, required: true },
    cuttingCompleted: { type: Number, required: true },
    sewingOutput: { type: Number, required: true },
    finishingOutput: { type: Number, required: true },
    packingCompleted: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)
// Pre-save hook to generate slNo

export const Output = model<TOutput>('Output', outputSchema)
