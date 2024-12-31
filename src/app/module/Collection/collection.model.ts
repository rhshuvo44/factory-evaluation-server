import { model, Schema } from 'mongoose'
import { TCollection } from './collection.interface'

const collectionSchema = new Schema<TCollection>(
  {
    slNo: { type: Number, unique: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    style: {
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
        'No Collection',
      ],
      required: true,
    },

    workOrderNo: { type: Number },
    challanNo: { type: String },
    ratePer: { type: Number, required: true },
    amount: { type: Number, required: true },
    orderQuantity: { type: Number, required: true },
    billQuantity: { type: Number, required: true },
    billNo: { type: String, required: true },
    moneyReceiptNo: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)
// Pre-save hook to generate slNo
collectionSchema.pre<TCollection>('save', async function (next) {
  if (this.date) {
    const lastEntry = await Collection.findOne().sort({ slNo: -1 })
    this.slNo = lastEntry ? lastEntry.slNo + 1 : 1
  }
  next()
})
export const Collection = model<TCollection>('Collection', collectionSchema)
