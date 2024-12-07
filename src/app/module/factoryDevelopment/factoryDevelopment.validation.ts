import { z } from 'zod'

export const factoryDevelopmentValidation = z.object({
  body: z.object({
    date: z.string(),
    particulars: z.string(),
    description: z.string(),
    quantity: z.number().min(0),
    memoNo: z.number().min(0),
    orderedBy: z.enum(['M.D', 'Chairman']),
    payTo: z.string(),
    paymentType: z.enum(['Monthly', 'Daily', 'Once']),
    unit: z.number().min(0),
    unitPrice: z.number().min(0),
    totalPrice: z.number().min(0),
  }),
})
export const factoryDevelopmentUpdateValidation = z.object({
  body: z.object({
    date: z.string().optional(),
    particulars: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number().min(0).optional(),
    memoNo: z.number().min(0).optional(),
    orderedBy: z.enum(['M.D', 'Chairman']).optional(),
    payTo: z.string().optional(),
    paymentType: z.enum(['Monthly', 'Daily', 'Once']).optional(),
    unit: z.number().min(0).optional(),
    unitPrice: z.number().min(0).optional(),
    totalPrice: z.number().min(0).optional(),
  }),
})
