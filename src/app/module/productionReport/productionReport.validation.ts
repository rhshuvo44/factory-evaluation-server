import { z } from 'zod'
const TSectionSchema = z.object({
  target: z.number().nonnegative(),
  wip: z.number().nonnegative(), // Work In Progress
  output: z.number().nonnegative(),
})
export const productionReportValidation = z.object({
  body: z.object({
    date: z.string(),
    lineNo: z.enum([
      'line 1 / 3rd floor',
      'line 2 / 4rd floor',
      'line 3 / 4rd floor',
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
    item: z.string(),
    color: z.string(),
    orderQuantity: z.number().nonnegative(),
    readyQuantity: z.number().nonnegative(),
    cuttingSection: TSectionSchema,
    sellingSection: TSectionSchema,
    finishing: TSectionSchema,
    remark: z.string().optional(),
  }),
})
export const productionReportUpdateValidation = z.object({
  body: z.object({
    date: z.string().optional(),
    lineNo: z
      .enum(['line 1 / 3rd floor', 'line 2 / 4rd floor', 'line 3 / 4rd floor'])
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
    item: z.string().optional(),
    color: z.string().optional(),
    orderQuantity: z.number().nonnegative().optional(),
    readyQuantity: z.number().nonnegative().optional(),
    cuttingSection: TSectionSchema.optional(),
    sellingSection: TSectionSchema.optional(),
    finishing: TSectionSchema.optional(),
    remark: z.string().optional(),
  }),
})
