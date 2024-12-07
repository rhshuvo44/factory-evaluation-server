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
    total: z.number().min(0),
    workOrderNo: z.number().min(0),
    challanNo: z.number().min(0),
    lineNo: z.enum([
      'line 1 / 3rd floor',
      'line 2 / 4th floor',
      'line 3 / 4th floor',
    ]),

    ratePer: z.number().min(0),
    amount: z.number().min(0),
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
    total: z.number().min(0).optional(),
    workOrderNo: z.number().min(0).optional(),
    challanNo: z.number().min(0).optional(),
    lineNo: z
      .enum(['line 1 / 3rd floor', 'line 2 / 4th floor', 'line 3 / 4th floor'])
      .optional(),

    ratePer: z.number().min(0).optional(),
    amount: z.number().min(0).optional(),
  }),
})
