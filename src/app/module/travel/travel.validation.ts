import { z } from 'zod'

export const travelValidation = z.object({
  body: z.object({
    slNo: z.number().int(),
    date: z.string(),
    particulars: z.string(),
    description: z.string(),
    remark: z.string().optional(),
    buyerId: z.string().optional(),
    orderNo: z.string(),
    payTo: z.string().optional(),
    paymentType: z.enum(['Monthly', 'Day', 'Once']),
    unit: z.string(),
    unitPrice: z.number().positive(),
    totalPrice: z.number().positive(),
  }),
})
export const travelUpdateValidation = z.object({
  body: z.object({
    slNo: z.number().int(),
    date: z.string().optional(),
    particulars: z.string().optional(),
    description: z.string().optional(),
    remark: z.string().optional(),
    buyerId: z.string().optional(),
    orderNo: z.string().optional(),
    payTo: z.string().optional(),
    paymentType: z.enum(['Monthly', 'Day', 'Once']).optional(),
    unit: z.string().optional(),
    unitPrice: z.number().positive().optional(),
    totalPrice: z.number().positive().optional(),
  }),
})
