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
      'No Collection',
    ]),
    workOrderNo: z.number().min(0),
    challanNo: z.string(),
    ratePer: z.number().min(0),
    amount: z.number().min(0),
    orderQuantity: z.number().min(0),
    billQuantity: z.number().min(0),
    billNo: z.string(),
    moneyReceiptNo: z.string(),
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
        'No Collection',
      ])
      .optional(),
    workOrderNo: z.number().min(0).optional(),
    challanNo: z.string().optional(),
    ratePer: z.number().min(0).optional(),
    amount: z.number().min(0).optional(),
    orderQuantity: z.number().min(0).optional(),
    billQuantity: z.number().min(0).optional(),
    billNo: z.string().optional(),
    moneyReceiptNo: z.string().optional(),
  }),
})
