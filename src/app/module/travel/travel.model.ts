import { model, Schema } from "mongoose";
import { TTravel } from "./travel.interface";

const TravelSchema = new Schema<TTravel>({
    slNo: { type: Number, required: true },
    date: { type: Date, required: true },
    particulars: { type: String, required: true },
    description: { type: String, required: true },
    remark: { type: String, },
    buyerId: { type: String, },
    orderNo: { type: String, },
    payTo: { type: String, required: true },
    paymentType: { type: String, enum: ['Monthly', 'Day', 'Once'], required: true },
    unit: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
});


export const Travel = model<TTravel>('Travel', TravelSchema);