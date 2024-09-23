import { z } from 'zod'

export const buyerDevelopmentValidation = z.object({
  body: z.object({
    date: z.string(),
    particulars: z.enum([
      'Commission',
      'Meal cost',
      'Machine Maintenance',
      'Loading & Unloading',
      'Rental Machine Bill',
      'Sample Development cost',
      'Night Bill (STF)',
      'Night Bill (WRK)',
    ]),
    description: z.string(),
    quantity: z.number().positive(),
    memoNo: z.number().positive(),
    buyerId: z.number().positive(),
    orderNo: z.number().positive(),
    payTo: z.string(),
    paymentType: z.enum(['Monthly', 'Daily', 'Once']),
    unit: z.number().positive(),
    unitPrice: z.number().positive(),
    totalPrice: z.number().positive(),
  }),
})
export const buyerDevelopmentUpdateValidation = z.object({
  body: z.object({
    date: z.string().optional(),
    particulars: z
      .enum([
        'Commission',
        'Meal cost',
        'Machine Maintenance',
        'Loading & Unloading',
        'Rental Machine Bill',
        'Sample Development cost',
        'Night Bill (STF)',
        'Night Bill (WRK)',
      ])
      .optional(),
    description: z.string().optional(),
    quantity: z.number().positive().optional(),
    memoNo: z.number().positive().optional(),
    buyerId: z.number().positive().optional(),
    orderNo: z.number().positive().optional(),
    payTo: z.string().optional(),
    paymentType: z.enum(['Monthly', 'Daily', 'Once']).optional(),
    unit: z.number().positive().optional(),
    unitPrice: z.number().positive().optional(),
    totalPrice: z.number().positive().optional(),
  }),
})
