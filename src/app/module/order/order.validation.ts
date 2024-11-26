import { z } from 'zod'

export const orderValidation = z.object({
  body: z.object({
    orderNo: z.string(),
    buyer: z.string(),
    styleNo: z.string(),
    description: z.string(),
    quantity: z.number().int().positive('Quantity must be a positive integer'),
    date: z.string(),
    shipmentDate: z.string(),
    leadTime: z.string(),
    fabricConsumption: z.number().positive(),
    totalFabric: z.number().positive(),
  }),
})
export const orderUpdateValidation = z.object({
  body: z.object({
    orderNo: z.string().optional(),
    buyer: z.string().optional(),
    styleNo: z.string().optional(),
    description: z.string().optional(),
    quantity: z
      .number()
      .int()
      .positive('Quantity must be a positive integer')
      .optional(),
    date: z.string().optional(),
    shipmentDate: z.string().optional(),
    leadTime: z.string().optional(),
    fabricConsumption: z.number().positive().optional(),
    totalFabric: z.number().positive().optional(),
  }),
})
