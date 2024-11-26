export type TOrder = {
  orderNo: string
  buyer: string
  styleNo: string
  description: string
  quantity: number
  date: Date
  shipmentDate: Date
  leadTime: string
  fabricConsumption: number
  totalFabric: number
}
export type TOrderUpdate = {
  orderNo?: string
  buyer?: string
  styleNo?: string
  description?: string
  quantity?: number
  date?: Date
  shipmentDate?: Date
  leadTime?: string
  fabricConsumption?: number
  totalFabric?: number
}
