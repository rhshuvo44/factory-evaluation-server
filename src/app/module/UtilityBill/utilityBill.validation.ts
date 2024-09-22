import { z } from 'zod'

const utilitiesSchema = z.object({
  unitPrice: z.number().min(0),
  totalPrice: z.number().min(0),
})

export const utilitySchema = z.object({
  body: z.object({
    date: z.string(),
    internet: z.array(utilitiesSchema).optional(),
    water: z.array(utilitiesSchema).optional(),
    electricity: z.array(utilitiesSchema).optional(),
    others: z.array(utilitiesSchema).optional(),
  }),
})
export const utilityUpdateSchema = z.object({
  body: z.object({
    internet: z.array(utilitiesSchema).optional(),
    water: z.array(utilitiesSchema).optional(),
    electricity: z.array(utilitiesSchema).optional(),
    others: z.array(utilitiesSchema).optional(),
  }),
})
