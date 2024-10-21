export type TLoan = {
  slNo: number
  date: Date
  particulars: 'Loan Return'
  description: 'Emergency Loan Return' | 'EMI Return'
  quantity: number
  memoNo: number
  orderedBy: 'M.D' | 'Chairman'
  payTo: 'M.D' | 'Chairman' | 'Sarkar Alliance OPC'
  paymentType: 'Bank' | 'Cash'
  unit: number
  unitPrice: number
  totalPrice: number
}
export type TLoanUpdate = {
  slNo?: number
  date?: Date
  particulars?: 'Loan Return'
  description?: 'Emergency Loan Return' | 'EMI Return'
  quantity?: number
  memoNo?: number
  orderedBy?: 'M.D' | 'Chairman'
  payTo?: 'M.D' | 'Chairman' | 'Sarkar Alliance OPC'
  paymentType?: 'Bank' | 'Cash'
  unit?: number
  unitPrice?: number
  totalPrice?: number
}
