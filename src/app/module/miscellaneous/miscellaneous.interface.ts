export type TMiscellaneous = {
    slNo: number
    date: string
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