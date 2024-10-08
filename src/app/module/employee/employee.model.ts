import { model, Schema } from 'mongoose'
import { TEmployee } from './employee.interface'

const employeeSchema = new Schema<TEmployee>(
  {
    slNo: { type: Number, unique: true },
    id: { type: String, unique: true },
    name: { type: String, required: true },
    photo: { type: String },
    salary: { type: Number },
    designation: {
      type: String,
      enum: [
        'Supervisor',
        'G.M',
        'P.M',
        'Ex. Accountant',
        'Security',
        'Cutting Master',
        'Fin. Incharge',
        'Mechanic',
        'Operator',
        'Folding',
        'Check',
        'Helper',
        'Maid',
        'Cleaner',
        'Cut. Helper',
        'Cutting',
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ['A', 'P'],
    },

    overTime: { type: Number, required: true },
    workingDays: { type: Number, required: true },
    overTimeRate: { type: Number, required: true },
    perDaySalary: { type: Number, required: true },
    grossPerDaySalary: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)
// Pre-save hook to generate slNo
employeeSchema.pre<TEmployee>('save', async function (next) {
  if (this.name) {
    const lastEntry = await Employee.findOne().sort({ slNo: -1 })
    this.slNo = lastEntry ? lastEntry.slNo + 1 : 1
  }
  this.id = `EMP${String(this.slNo).padStart(5, '0')}`
  next()
})
export const Employee = model<TEmployee>('Employee', employeeSchema)
