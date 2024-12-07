import { z } from 'zod'

export const outputValidation = z.object({
  body: z.object({
    date: z.string(),
    cuttingCompleted: z.number().min(0),
    sewingOutput: z.number().min(0),
    finishingOutput: z.number().min(0),
    packingCompleted: z.number().min(0),
  }),
})
