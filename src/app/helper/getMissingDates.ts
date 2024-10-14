import { Travel } from '../module/travel/travel.model'
import { subtractDays } from '../utils/subtractDays'

export const getMissingTravelDates = async (
  currentDate: Date,
): Promise<string[]> => {
  const previousDates = await Travel.find({
    date: {
      $gte: subtractDays(currentDate, 45),
      $lte: currentDate,
    },
  })

  const missingDates: string[] = []
  const dateCursor = subtractDays(currentDate, 45)

  // Loop through previous dates and check for missing entries
  while (dateCursor <= currentDate) {
    const exists = previousDates.some(
      entry =>
        entry.date.toISOString().split('T')[0] ===
        dateCursor.toISOString().split('T')[0],
    )
    if (!exists) {
      missingDates.push(dateCursor.toISOString().split('T')[0])
    }
    dateCursor.setDate(dateCursor.getDate() + 1) // Move to the next day
  }

  return missingDates
}
