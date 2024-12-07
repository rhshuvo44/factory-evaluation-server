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
    quantity: z.number().min(0),
    memoNo: z.number().min(0),
    buyerId: z.number().min(0),
    orderNo: z.number().min(0),
    payTo: z.string(),
    paymentType: z.enum(['Monthly', 'Daily', 'Once']),
    unit: z.number().min(0),
    unitPrice: z.number().min(0),
    totalPrice: z.number().min(0),
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
    quantity: z.number().min(0).optional(),
    memoNo: z.number().min(0).optional(),
    buyerId: z.number().min(0).optional(),
    orderNo: z.number().min(0).optional(),
    payTo: z.string().optional(),
    paymentType: z.enum(['Monthly', 'Daily', 'Once']).optional(),
    unit: z.number().min(0).optional(),
    unitPrice: z.number().min(0).optional(),
    totalPrice: z.number().min(0).optional(),
  }),
})
