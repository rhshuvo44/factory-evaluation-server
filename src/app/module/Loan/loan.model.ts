import { model, Schema } from 'mongoose'
import { TLoan } from './loan.interface'

const loanSchema = new Schema<TLoan>(
  {
    slNo: { type: Number, unique: true },
    date: { type: Date, required: true },
    particulars: { type: String, enum: ['Loan Return'], required: true },
    description: {
      type: String,
      enum: ['Emergency Loan Return', 'EMI Return'],
      required: true,
    },
    quantity: { type: Number },
    memoNo: { type: Number },
    orderedBy: {
      type: String,
      enum: ['M.D', 'Chairman'],
      required: true,
    },
    payTo: {
      type: String,
      enum: ['M.D', 'Chairman', 'Sarkar Alliance OPC'],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ['Bank', 'Cash'],
      required: true,
    },
    unit: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)
// Pre-save hook to generate slNo
loanSchema.pre<TLoan>('save', async function (next) {
  if (this.date) {
    const lastEntry = await Loan.findOne().sort({ slNo: -1 })
    this.slNo = lastEntry ? lastEntry.slNo + 1 : 1
  }
  next()
})
export const Loan = model<TLoan>('Loan', loanSchema)
