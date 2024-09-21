import { z } from "zod";

export const miscellaneousValidation = z.object({
  body: z.object({
    date: z.string(),
    particulars: z.string(),
    description: z.string(),
    remark: z.string().optional(),
    buyerId: z.string().optional(),
    orderNo: z.string(),
    payTo: z.string().optional(),
    paymentType: z.enum(['Monthly', 'Daily', 'Once']),
    unit: z.string(),
    unitPrice: z.number().positive(),
    totalPrice: z.number().positive(),
  }),
})