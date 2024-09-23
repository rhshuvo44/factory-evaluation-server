export type TBuyerDevelopment = {
  slNo: number
  date: Date
  particulars:
    | 'Commission'
    | 'Meal cost'
    | 'Machine Maintenance'
    | 'Loading & Unloading'
    | 'Rental Machine Bill'
    | 'Sample Development cost'
    | 'Night Bill (STF)'
    | 'Night Bill (WRK)'
  description: string
  quantity: number
  memoNo: number
  buyerId: number
  orderNo: number
  payTo: string
  paymentType: 'Monthly' | 'Daily' | 'Once'
  unit: number
  unitPrice: number
  totalPrice: number
}
export type TBuyerDevelopmentUpdate = {
  slNo?: number
  date?: Date
  particulars?:
    | 'Commission'
    | 'Meal cost'
    | 'Machine Maintenance'
    | 'Loading & Unloading'
    | 'Rental Machine Bill'
    | 'Sample Development cost'
    | 'Night Bill (STF)'
    | 'Night Bill (WRK)'
  description?: string
  quantity?: number
  memoNo?: number
  buyerId?: number
  orderNo?: number
  payTo?: string
  paymentType?: 'Monthly' | 'Daily' | 'Once'
  unit?: number
  unitPrice?: number
  totalPrice?: number
}
