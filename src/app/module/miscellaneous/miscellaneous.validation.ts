import { z } from 'zod'

export const miscellaneousValidation = z.object({
  body: z.object({
    date: z.string(),
    particulars: z.string(),
    description: z.string(),
    remark: z.string().optional(),
    buyerId: z.string().optional(),
    orderNo: z.string(),
    payTo: z.string().optional(),
    paymentType: z.enum(['Monthly', 'Daily', 'Once']),
    unit: z.string(),
    unitPrice: z.number().positive(),
    totalPrice: z.number().positive(),
  }),
})
export const miscellaneousUpdateValidation = z.object({
  body: z.object({
    date: z.string().optional(),
    particulars: z.string().optional(),
    description: z.string().optional(),
    remark: z.string().optional(),
    buyerId: z.string().optional(),
    orderNo: z.string().optional(),
    payTo: z.string().optional(),
    paymentType: z.enum(['Monthly', 'Daily', 'Once']).optional(),
    unit: z.string().optional(),
    unitPrice: z.number().positive().optional(),
    totalPrice: z.number().positive().optional(),
  }),
})
