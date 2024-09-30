import { model, Schema } from 'mongoose'
import { TCollection } from './collection.interface'

// | ''
// | ''
// | ''
// | ''
// | ''
// | ''
// | ''
// | ''
// | ''
// | ''

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
      ],
      required: true,
    },
    total: { type: Number },
    workOrderNo: { type: Number },
    challanNo: { type: Number },

    lineNo: {
      type: String,
      enum: ['line 1 / 3rd floor', 'line 2 / 4th floor', 'line 3 / 4th floor'],
      required: true,
    },
    ratePer: { type: Number, required: true },
    amount: { type: Number, required: true },
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
