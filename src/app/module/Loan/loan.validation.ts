import { z } from 'zod'

export const miscellaneousValidation = z.object({
    body: z.object({
        date: z.string(),
        particulars: z.string(),
        description: z.string(),
        quantity: z.number().positive(),
        memoNo: z.number().positive(),
        orderedBy: z.enum(['M.D', 'Chairman']),
        payTo: z.enum(['M.D', 'Chairman', "Sarkar Alliance OPC"]),
        paymentType: z.enum(['Bank', 'Cash']),
        unit: z.number().positive(),
        unitPrice: z.number().positive(),
        totalPrice: z.number().positive(),
    }),
})