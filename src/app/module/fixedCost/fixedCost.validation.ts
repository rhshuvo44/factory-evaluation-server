import { z } from 'zod'

const fixedCostSubSchema = z.object({
  unitPrice: z.number().min(0),
  totalPrice: z.number().min(0),
})

export const fixedCostSchema = z.object({
  body: z.object({
    date: z.string(),
    factoryRent: z.array(fixedCostSubSchema).optional(),
    honorary: z.array(fixedCostSubSchema).optional(),
    factoryRevenue: z.array(fixedCostSubSchema).optional(),
  }),
})
export const fixedCostUpdateSchema = z.object({
  body: z.object({
    factoryRent: z.array(fixedCostSubSchema).optional(),
    honorary: z.array(fixedCostSubSchema).optional(),
    factoryRevenue: z.array(fixedCostSubSchema).optional(),
  }),
})
