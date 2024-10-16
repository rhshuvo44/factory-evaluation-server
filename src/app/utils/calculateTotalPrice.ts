interface UtilityItem {
  unitPrice: number
  totalPrice: number
}

 export interface UtilityRecord {
  electricity: UtilityItem[]
  internet: UtilityItem[]
  water: UtilityItem[]
  others: UtilityItem[]
}

interface TotalPrices {
  electricity: number
  internet: number
  water: number
  others: number
}

export const calculateTotalPrices = (result: UtilityRecord[]): TotalPrices => {
  return result.reduce(
    (acc: TotalPrices, record: UtilityRecord) => {
      const electricityTotal = record.electricity.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      )
      const internetTotal = record.internet.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      )
      const waterTotal = record.water.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      )
      const othersTotal = record.others.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      )

      acc.electricity += electricityTotal
      acc.internet += internetTotal
      acc.water += waterTotal
      acc.others += othersTotal
      return acc
    },
    {
      electricity: 0,
      internet: 0,
      water: 0,
      others: 0,
    },
  )
}
