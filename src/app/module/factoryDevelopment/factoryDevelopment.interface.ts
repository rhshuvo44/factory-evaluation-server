export type TFactoryDevelopment = {
  slNo: number
  date: Date
  particulars: string
  description: string
  quantity: number
  memoNo: number
  orderedBy: 'M.D' | 'Chairman'
  payTo: 'M.D' | 'Chairman' | 'Sarkar Alliance OPC'
  paymentType: 'Bank' | 'Cash'
  unit: number
  unitPrice: number
  totalPrice: number
}
export type TFactoryDevelopmentUpdate = {
  slNo?: number
  date?: Date
  particulars?: string
  description?: string
  quantity?: number
  memoNo?: number
  orderedBy?: 'M.D' | 'Chairman'
  payTo?: 'M.D' | 'Chairman' | 'Sarkar Alliance OPC'
  paymentType?: 'Bank' | 'Cash'
  unit?: number
  unitPrice?: number
  totalPrice?: number
}
