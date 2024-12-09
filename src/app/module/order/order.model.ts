import { model, Schema } from 'mongoose'
import { TOrder } from './order.interface'

const orderSchema = new Schema<TOrder>(
  {
    orderNo: { type: String, required: true, unique: true },
    buyer: { type: String, required: true },
    styleNo: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    orderDate: { type: Date, required: true },
    shipmentDate: { type: Date, required: true },
    leadTime: { type: String, required: true },
    fabricConsumption: { type: Number, required: true },
    totalFabric: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)

export const Order = model<TOrder>('Order', orderSchema)
