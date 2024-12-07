import { z } from 'zod'

export const travelValidation = z.object({
  body: z.object({
    date: z.string(),
    particulars: z.string(),
    description: z.string(),
    remark: z.string(),
    buyerId: z.number(),
    orderNo: z.number(),
    memoNo: z.number(),
    payTo: z.string(),
    paymentType: z.enum(['Monthly', 'Daily', 'Once']),
    unit: z.number(),
    unitPrice: z.number().min(0),
    totalPrice: z.number().min(0),
  }),
})
export const travelUpdateValidation = z.object({
  body: z.object({
    date: z.string().optional(),
    particulars: z.string().optional(),
    description: z.string().optional(),
    remark: z.string().optional(),
    buyerId: z.number().optional(),
    orderNo: z.number().optional(),
    memoNo: z.number().optional(),
    payTo: z.string().optional(),
    paymentType: z.enum(['Monthly', 'Daily', 'Once']).optional(),
    unit: z.number().optional(),
    unitPrice: z.number().min(0).optional(),
    totalPrice: z.number().min(0).optional(),
  }),
})
