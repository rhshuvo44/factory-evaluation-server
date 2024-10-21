import { z } from 'zod'
const TSectionSchema = z.object({
  target: z.number().nonnegative(),
  wip: z.number().nonnegative(), // Work In Progress
  output: z.number().nonnegative(),
})
export const targetOutputValidation = z.object({
  body: z.object({
    date: z.string(),
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
    cuttingSection: z.array(TSectionSchema),
    sewingSection: z.array(TSectionSchema),
    finishing: z.array(TSectionSchema),
    remark: z.string().optional(),
  }),
})
export const targetOutputUpdateValidation = z.object({
  body: z.object({
    date: z.string().optional(),
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
    cuttingSection: z.array(TSectionSchema).optional(),
    sewingSection: z.array(TSectionSchema).optional(),
    finishing: z.array(TSectionSchema).optional(),
    remark: z.string().optional(),
  }),
})
