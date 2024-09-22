export type TLoan = {
    slNo: number
    date: Date
    particulars: string
    description: string
    quantity: number
    memoNo: string
    orderedBy: "M.D" | "Chairman"
    payTo: "M.D" | "Chairman" | "Sarkar Alliance OPC"
    paymentType: 'Bank' | 'Cash'
    unit: number
    unitPrice: number
    totalPrice: number
}