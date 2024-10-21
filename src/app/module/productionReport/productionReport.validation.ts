import { z } from 'zod'

export const productionReportValidation = z.object({
  body: z.object({
    date: z.string(),
    lineNo: z.enum([
      'line 1 / 3rd floor',
      'line 2 / 4th floor',
      'line 3 / 4th floor',
    ]),
    buyer: z.string(),
    orderNo: z.number().positive(), // Order number should be positive
    styleNo: z.enum([
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
    color: z.string(),
    orderQuantity: z.number().nonnegative(),
    readyQuantity: z.number().nonnegative(),
    remark: z.string().optional(),
  }),
})
export const productionReportUpdateValidation = z.object({
  body: z.object({
    date: z.string().optional(),
    lineNo: z
      .enum(['line 1 / 3rd floor', 'line 2 / 4th floor', 'line 3 / 4th floor'])
      .optional(),
    buyer: z.string().optional(),
    orderNo: z.number().positive().optional(), // Order number should be positive
    styleNo: z
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
    color: z.string().optional(),
    orderQuantity: z.number().nonnegative().optional(),
    readyQuantity: z.number().nonnegative().optional(),
    remark: z.string().optional(),
  }),
})
