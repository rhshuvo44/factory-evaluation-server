export const subtractDays = (date: Date, days: number): Date => {
  const newDate = new Date(date)
  newDate.setDate(date.getDate() - days)
  return newDate
}
