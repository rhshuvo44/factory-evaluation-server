import { z } from 'zod'

export const notificationValidation = z.object({
  body: z.object({
    date: z.string(),
    message: z.string(),
  }),
})
