export type TTravel = {
  slNo: number
  date: Date
  particulars: string
  description: string
  remark?: string
  buyerId?: string
  orderNo?: string
  payTo: string
  paymentType: 'Monthly' | 'Daily' | 'Once'
  unit?: string
  unitPrice: number
  totalPrice: number
}
export type TTravelUpdate = {
  slNo?: number
  date?: Date
  particulars?: string
  description?: string
  remark?: string
  buyerId?: string
  orderNo?: string
  payTo?: string
  paymentType?: 'Monthly' | 'Daily' | 'Once'
  unit?: string
  unitPrice?: number
  totalPrice?: number
}
