import { TEntity } from '../types'

export const deleteAtSign = (string: string): string | null => {
  if (string) {
    const text = string.split('@')
    return text[1] ? text[1] : text[0]
  }
  return null
}

export const formatCalculateMessage = (toDollar: boolean, dollar?: number, bolivar?: number): string => {
  return toDollar ? `*Dólares calculados: $ ${dollar}*\n\n` : `*Bolívares calculados: Bs. ${bolivar}*\n\n`
}

export const formatEntityMessage = (entity: TEntity, calculate: boolean = false, toDollar: boolean = false): string => {
  const title = deleteAtSign(entity.info.title)
  const dollar = entity.info.dollar
  const updatedDate = entity.info.updatedDate

  return `- *${title}* -\nDólar: Bs. ${dollar}\nFecha de actualización: ${updatedDate}\n${calculate && formatCalculateMessage(toDollar, entity.dollarCalculated ?? 0, entity.bolivarCalculated ?? 0)}`
}

/**
 * Formats a date to "hh:mm a dd/MM/yyyy" format in the America/Caracas timezone.
 * @param date The date to format. If not provided, the current date and time will be used.
 * @returns The formatted date string, or null if an error occurred during formatting.
 */
export const dateFormatter = (date: Date = new Date()): string | null => {
  try {

    const locale = process.env.LOCALE ?? ''
    const timeZone = process.env.TIMEZONE ?? ''

    // Convert the date to the America/Caracas timezone
    const options = { timeZone }
    const localeDate = new Date(date.toLocaleString(locale, options))

    // Format the date and time components
    const hour = localeDate.toLocaleString(locale, { hour: 'numeric', hour12: true })
    const minute = localeDate.toLocaleString(locale, { minute: '2-digit' })
    const meridian = localeDate.toLocaleString(locale, { hour: 'numeric', hour12: true, hourCycle: 'h23' }).slice(-2)
    const day = localeDate.toLocaleString(locale, { day: '2-digit' })
    const month = localeDate.toLocaleString(locale, { month: '2-digit' })
    const year = localeDate.toLocaleString(locale, { year: 'numeric' })

    // Concatenate the components into the formatted date string
    const formattedDate = `${hour}:${minute} ${meridian} del ${day}/${month}/${year}`

    return formattedDate

  } catch (error) {
    console.log('Error trying to format date:', error)
    return null
  }
}