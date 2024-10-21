export type TSection = {
  target: number
  wip: number
  output: number
}
export type TProductionReport = {
  slNo: number
  date: Date
  lineNo: 'line 1 / 3rd floor' | 'line 2 / 4th floor' | 'line 3 / 4th floor'
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
  readyQuantity: number
  cuttingSection: TSection[]
  sewingSection: TSection[]
  finishing: TSection[]
  remark?: string
}
export type TProductionReportUpdate = {
  date?: Date
  lineNo?: 'line 1 / 3rd floor' | 'line 2 / 4th floor' | 'line 3 / 4th floor'
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
  item?: string
  color?: string
  orderQuantity?: number
  readyQuantity?: number
  cuttingSection?: TSection[]
  sewingSection?: TSection[]
  finishing?: TSection[]
  remark?: string
}
