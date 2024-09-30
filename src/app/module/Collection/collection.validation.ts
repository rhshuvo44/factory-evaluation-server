import { z } from 'zod'

export const collectionValidation = z.object({
  body: z.object({
    date: z.string(),
    time: z.string(),
    style: z.enum([
      'hoody/jacket',
      'Leggins',
      'Polo Shirt',
      'T-Shirt',
      'Tank Top',
      'Sweat Shirt',
      'Trouser',
      'Shorts',
      'Romper/Keeper',
      'Long Sleeve T-shirt',
    ]),
    total: z.number().positive(),
    workOrderNo: z.number().positive(),
    challanNo: z.number().positive(),
    lineNo: z.enum([
      'line 1 / 3rd floor',
      'line 2 / 4th floor',
      'line 3 / 4th floor',
    ]),

    ratePer: z.number().positive(),
    amount: z.number().positive(),
  }),
})
export const collectionUpdateValidation = z.object({
  body: z.object({
    date: z.string().optional(),
    time: z.string().optional(),
    style: z
      .enum([
        'hoody/jacket',
        'Leggins',
        'Polo Shirt',
        'T-Shirt',
        'Tank Top',
        'Sweat Shirt',
        'Trouser',
        'Shorts',
        'Romper/Keeper',
        'Long Sleeve T-shirt',
      ])
      .optional(),
    total: z.number().positive().optional(),
    workOrderNo: z.number().positive().optional(),
    challanNo: z.number().positive().optional(),
    lineNo: z
      .enum(['line 1 / 3rd floor', 'line 2 / 4th floor', 'line 3 / 4th floor'])
      .optional(),

    ratePer: z.number().positive().optional(),
    amount: z.number().positive().optional(),
  }),
})
