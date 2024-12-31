export type TCollection = {
  slNo: number
  date: Date
  time: string
  style:
    | 'hoody/jacket'
    | 'Leggins'
    | 'Polo Shirt'
    | 'T-Shirt'
    | 'Tank Top'
    | 'Sweat Shirt'
    | 'Trouser'
    | 'Shorts'
    | 'Romper/Keeper'
    | 'Long Sleeve T-shirt'
    | 'No Collection'

  workOrderNo: number

  challanNo: string
  ratePer: number
  amount: number
  orderQuantity: number
  billQuantity: number
  billNo: string
  moneyReceiptNo: string
}
export type TCollectionUpdate = {
  slNo?: number
  date?: Date
  time?: string
  style?:
    | 'hoody/jacket'
    | 'Leggins'
    | 'Polo Shirt'
    | 'T-Shirt'
    | 'Tank Top'
    | 'Sweat Shirt'
    | 'Trouser'
    | 'Shorts'
    | 'Romper/Keeper'
    | 'Long Sleeve T-shirt'
    | 'No Collection'

  workOrderNo?: number
  challanNo?: string
  ratePer?: number
  amount?: number

  orderQuantity?: number
  billQuantity?: number
  billNo?: string
  moneyReceiptNo: string
}
