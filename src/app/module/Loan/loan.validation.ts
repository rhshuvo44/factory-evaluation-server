import { z } from 'zod'

export const loanValidation = z.object({
  body: z.object({
    date: z.string(),
    particulars: z.string().refine(val => val === 'Loan Return', {
      message: "Particulars must be 'Loan Return'",
    }),
    description: z.enum(['Emergency Loan Return', 'EMI Return'], {
      errorMap: () => ({
        message: "Description must be 'Emergency Loan Return' or 'EMI Return'",
      }),
    }),
    quantity: z.number().min(0),
    memoNo: z.number().min(0),
    orderedBy: z.enum(['M.D', 'Chairman']),
    payTo: z.enum(['M.D', 'Chairman', 'Sarkar Alliance OPC']),
    paymentType: z.enum(['Bank', 'Cash']),
    unit: z.number().min(0),
    unitPrice: z.number().min(0),
    totalPrice: z.number().min(0),
  }),
})
export const loanUpdateValidation = z.object({
  body: z.object({
    date: z.string().optional(),
    particulars: z
      .string()
      .refine(val => val === 'Loan Return', {
        message: "Particulars must be 'Loan Return'",
      })
      .optional(),
    description: z
      .enum(['Emergency Loan Return', 'EMI Return'], {
        errorMap: () => ({
          message:
            "Description must be 'Emergency Loan Return' or 'EMI Return'",
        }),
      })
      .optional(),
    quantity: z.number().min(0).optional(),
    memoNo: z.number().min(0).optional(),
    orderedBy: z.enum(['M.D', 'Chairman']).optional(),
    payTo: z.enum(['M.D', 'Chairman', 'Sarkar Alliance OPC']).optional(),
    paymentType: z.enum(['Bank', 'Cash']).optional(),
    unit: z.number().min(0).optional(),
    unitPrice: z.number().min(0).optional(),
    totalPrice: z.number().min(0).optional(),
  }),
})
