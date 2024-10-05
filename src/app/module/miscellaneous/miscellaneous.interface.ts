export type TMiscellaneous = {
  slNo: number
  date: Date
  particulars: string
  description: string
  remark: string
  buyerId: number
  orderNo: number
  memoNo: number
  payTo: string
  paymentType: 'Monthly' | 'Daily' | 'Once'
  unit?: number
  unitPrice: number
  totalPrice: number
}
export type TMiscellaneousUpdate = {
  date?: Date
  particulars?: string
  description?: string
  remark?: string
  buyerId?: number
  orderNo?: number
  memoNo?: number
  payTo?: string
  paymentType?: 'Monthly' | 'Daily' | 'Once'
  unit?: number
  unitPrice?: number
  totalPrice?: number
}
