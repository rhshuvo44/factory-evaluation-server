interface UtilityItem {
  unitPrice: number
  totalPrice: number
}

interface UtilityRecord {
  factoryRent: UtilityItem[]
  honorary: UtilityItem[]
  factoryRevenue: UtilityItem[]
}

interface TotalPrices {
  factoryRent: number
  honorary: number
  factoryRevenue: number
}

export const calculateFixedTotalPrices = (
  result: UtilityRecord[],
): TotalPrices => {
  return result.reduce(
    (acc: TotalPrices, record: UtilityRecord) => {
      const factoryRentTotal = record.factoryRent.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      )
      const honoraryTotal = record.honorary.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      )
      const factoryRevenueTotal = record.factoryRevenue.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      )

      acc.factoryRent += factoryRentTotal
      acc.honorary += honoraryTotal
      acc.factoryRevenue += factoryRevenueTotal
      return acc
    },
    {
      factoryRent: 0,
      honorary: 0,
      factoryRevenue: 0,
    },
  )
}
