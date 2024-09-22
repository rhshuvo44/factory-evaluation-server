import { z } from 'zod'

const utilitiesSchema = z.object({
  unitPrice: z.number().min(0),
  totalPrice: z.number().min(0),
})

export const utilitySchema = z.object({
  body: z.object({
    date: z.string(),
    internet: z.array(utilitiesSchema),
    water: z.array(utilitiesSchema),
    electricity: z.array(utilitiesSchema),
    others: z.array(utilitiesSchema).optional(),
  }),
})
