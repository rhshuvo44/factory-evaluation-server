import { z } from 'zod'

export const productionReportValidation = z.object({
  body: z.object({
    orderNo: z.string().nonempty('Order number is required'),
    buyer: z.string().nonempty('Buyer is required'),
    styleNo: z.string().nonempty('Style number is required'),
    description: z.string().nonempty('Description is required'),
    quantity: z.number().int().positive('Quantity must be a positive integer'),
    date: z.string(),
    shipmentDate: z.string(),
    leadTime: z.string().nonempty('Lead time is required'),
    fabricConsumption: z
      .number()
      .nonnegative('Fabric consumption must be non-negative'),
    totalFabric: z.number().nonnegative('Total fabric must be non-negative'),
    fabricInHouse: z
      .number()
      .nonnegative('Fabric in-house must be non-negative'),
    requiredFabric: z
      .number()
      .nonnegative('Required fabric must be non-negative'),
    cuttingCompleted: z
      .number()
      .nonnegative('Cutting completed must be non-negative'),
    cuttingRequired: z
      .number()
      .nonnegative('Cutting required must be non-negative'),
    deliveryToPrint: z
      .number()
      .nonnegative('Delivery to print must be non-negative'),
    deliveryToPrintRemaining: z
      .number()
      .nonnegative('Delivery to print remaining must be non-negative'),
    printCompleted: z
      .number()
      .nonnegative('Print completed must be non-negative'),
    printReceivable: z
      .number()
      .nonnegative('Print receivable must be non-negative'),
    sewingInput: z.number().nonnegative('Sewing input must be non-negative'),
    sewingInputRemaining: z
      .number()
      .nonnegative('Sewing input remaining must be non-negative'),
    sewingOutput: z.number().nonnegative('Sewing output must be non-negative'),
    sewingOutputRemaining: z
      .number()
      .nonnegative('Sewing output remaining must be non-negative'),
    finishingOutput: z
      .number()
      .nonnegative('Finishing output must be non-negative'),
    finishingOutputRemaining: z
      .number()
      .nonnegative('Finishing output remaining must be non-negative'),
    packingCompleted: z
      .number()
      .nonnegative('Packing completed must be non-negative'),
    packingRemaining: z
      .number()
      .nonnegative('Packing remaining must be non-negative'),
    remark: z.string().optional(),
  }),
})
export const productionReportUpdateValidation = z.object({
  body: z.object({
    orderNo: z.string().nonempty('Order number is required').optional(),
    buyer: z.string().nonempty('Buyer is required').optional(),
    styleNo: z.string().nonempty('Style number is required').optional(),
    description: z.string().nonempty('Description is required').optional(),
    quantity: z
      .number()
      .int()
      .positive('Quantity must be a positive integer')
      .optional(),
    date: z.string().optional(),
    shipmentDate: z.string().optional(),
    leadTime: z.string().nonempty('Lead time is required').optional(),
    fabricConsumption: z
      .number()
      .nonnegative('Fabric consumption must be non-negative')
      .optional(),
    totalFabric: z
      .number()
      .nonnegative('Total fabric must be non-negative')
      .optional(),
    fabricInHouse: z
      .number()
      .nonnegative('Fabric in-house must be non-negative')
      .optional(),
    requiredFabric: z
      .number()
      .nonnegative('Required fabric must be non-negative')
      .optional(),
    cuttingCompleted: z
      .number()
      .nonnegative('Cutting completed must be non-negative')
      .optional(),
    cuttingRequired: z
      .number()
      .nonnegative('Cutting required must be non-negative')
      .optional(),
    deliveryToPrint: z
      .number()
      .nonnegative('Delivery to print must be non-negative')
      .optional(),
    deliveryToPrintRemaining: z
      .number()
      .nonnegative('Delivery to print remaining must be non-negative')
      .optional(),
    printCompleted: z
      .number()
      .nonnegative('Print completed must be non-negative')
      .optional(),
    printReceivable: z
      .number()
      .nonnegative('Print receivable must be non-negative')
      .optional(),
    sewingInput: z
      .number()
      .nonnegative('Sewing input must be non-negative')
      .optional(),
    sewingInputRemaining: z
      .number()
      .nonnegative('Sewing input remaining must be non-negative')
      .optional(),
    sewingOutput: z
      .number()
      .nonnegative('Sewing output must be non-negative')
      .optional(),
    sewingOutputRemaining: z
      .number()
      .nonnegative('Sewing output remaining must be non-negative')
      .optional(),
    finishingOutput: z
      .number()
      .nonnegative('Finishing output must be non-negative')
      .optional(),
    finishingOutputRemaining: z
      .number()
      .nonnegative('Finishing output remaining must be non-negative')
      .optional(),
    packingCompleted: z
      .number()
      .nonnegative('Packing completed must be non-negative')
      .optional(),
    packingRemaining: z
      .number()
      .nonnegative('Packing remaining must be non-negative')
      .optional(),
    remark: z.string().optional(),
  }),
})
