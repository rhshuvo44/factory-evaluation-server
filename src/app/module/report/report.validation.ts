import { z } from 'zod'

export const reportSchema = z.object({
  body: z.object({
    date: z.string(),
    factoryRunningCost: z.number().min(0),
    factoryCollection: z.number().min(0),
    balance: z.number(),
  }),
})
