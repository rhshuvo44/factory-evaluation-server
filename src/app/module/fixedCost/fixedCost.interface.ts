export type fixedCostSub = {
  unitPrice: number
  totalPrice: number
}

export type TFixedCost = {
  slNo: number
  date: Date
  factoryRent?: fixedCostSub[]
  honorary?: fixedCostSub[]
  factoryRevenue?: fixedCostSub[]
}
export type TFixedCostUpdate = {
  factoryRent?: fixedCostSub[]
  honorary?: fixedCostSub[]
  factoryRevenue?: fixedCostSub[]
}
