export type TToDayReport = {
  orderNo: string
  styleNo: string
  quantity: number
  date: Date
  cuttingCompleted: number
  printCompleted: number
  sewingOutput: number
  finishingOutput: number
  packingCompleted: number
}
export type TProductionReport = {
  orderNo: string
  buyer: string
  styleNo: string
  description: string
  quantity: number
  date: Date
  orderDate: Date
  shipmentDate: Date
  leadTime: string
  fabricConsumption: number
  totalFabric: number
  fabricInHouse: number
  requiredFabric: number
  cuttingCompleted: number
  cuttingRequired: number
  deliveryToPrint: number
  deliveryToPrintRemaining: number
  printCompleted: number
  printReceivable: number
  sewingInput: number
  sewingInputRemaining: number
  sewingOutput: number
  sewingOutputRemaining: number
  finishingOutput: number
  finishingOutputRemaining: number
  packingCompleted: number
  packingRemaining: number
  remark?: string
}
export type TProductionReportUpdate = {
  orderNo?: string
  buyer?: string
  styleNo?: string
  description?: string
  quantity?: number
  date?: Date
  orderDate?: Date
  shipmentDate?: Date
  leadTime?: string
  fabricConsumption?: number
  totalFabric?: number
  fabricInHouse?: number
  requiredFabric?: number
  cuttingCompleted?: number
  cuttingRequired?: number
  deliveryToPrint?: number
  deliveryToPrintRemaining?: number
  printCompleted?: number
  printReceivable?: number
  sewingInput?: number
  sewingInputRemaining?: number
  sewingOutput?: number
  sewingOutputRemaining?: number
  finishingOutput?: number
  finishingOutputRemaining?: number
  packingCompleted?: number
  packingRemaining?: number
  remark?: string
}
