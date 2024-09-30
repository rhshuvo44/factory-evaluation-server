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
  total: number
  workOrderNo: number
  lineNo: 'line 1 / 3rd floor' | 'line 2 / 4th floor' | 'line 3 / 4th floor'
  challanNo: number
  ratePer: number
  amount: number
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
  total?: number
  workOrderNo?: number
  lineNo?: 'line 1 / 3rd floor' | 'line 2 / 4th floor' | 'line 3 / 4th floor'
  challanNo?: number
  ratePer?: number
  amount?: number
}
