import { z } from 'zod'

export const factoryDevelopmentValidation = z.object({
  body: z.object({
    date: z.string(),
    particulars: z.string(),
    description: z.string(),
    quantity: z.number().positive(),
    memoNo: z.number().positive(),
    orderedBy: z.enum(['M.D', 'Chairman']),
    payTo: z.string(),
    paymentType: z.enum(['Monthly', 'Daily', 'Once']),
    unit: z.number().positive(),
    unitPrice: z.number().positive(),
    totalPrice: z.number().positive(),
  }),
})
export const factoryDevelopmentUpdateValidation = z.object({
  body: z.object({
    date: z.string().optional(),
    particulars: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number().positive().optional(),
    memoNo: z.number().positive().optional(),
    orderedBy: z.enum(['M.D', 'Chairman']).optional(),
    payTo: z.string().optional(),
    paymentType: z.enum(['Monthly', 'Daily', 'Once']).optional(),
    unit: z.number().positive().optional(),
    unitPrice: z.number().positive().optional(),
    totalPrice: z.number().positive().optional(),
  }),
})
