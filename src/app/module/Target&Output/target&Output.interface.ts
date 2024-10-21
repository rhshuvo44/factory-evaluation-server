export type TSection = {
  target: number
  wip: number
  output: number
}
export type TTargetOutput = {
  slNo: number
  date: Date
  buyer: string
  orderNo: number
  styleNo:
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
  color: string
  orderQuantity: number
  cuttingSection: TSection[]
  sewingSection: TSection[]
  finishing: TSection[]
  remark?: string
}
export type TTargetOutputUpdate = {
  date?: Date
  buyer?: string
  orderNo?: number
  styleNo?:
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
  color?: string
  orderQuantity?: number
  cuttingSection?: TSection[]
  sewingSection?: TSection[]
  finishing?: TSection[]
  remark?: string
}
