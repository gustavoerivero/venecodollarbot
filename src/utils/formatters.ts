import { TDate, TEntity } from "../types"

export const locale = process.env.LOCALE ?? ""
export const timeZone = process.env.TIMEZONE ?? ""

export const months = [
  "Enero", "Febrero", "Marzo",
  "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre",
  "Octubre", "Noviembre", "Diciembre"
]

export const days = [
  "Domingo", "Lunes", "Martes", "Miércoles", 
  "Jueves", "Viernes", "Sábado"
]

const options = { timeZone }

/**
 * Method to get the hour from a date string or Date object.
 * @param {string | Date | null} date - The date to extract the hour from.
 * @returns {string} The formatted hour in HH:mm AM/PM format.
 * @throws {Error} If the date value is missing or in an invalid format.
 */
export const getHour = (date: string | Date | null): string => {
  try {
    if (!date) {
      throw Error("The date value must exist in date or string format.")
    }

    let localDate: Date

    if (typeof date === "string") {
      localDate = new Date(date)
    } else {
      localDate = date
    }

    return localDate.toLocaleTimeString(locale, options)
  } catch (error) {
    throw Error(`Error trying to get the hour: ${error}`)
  }
}

/**
 * Method to get the formatted date information from a Date object.
 * @param {Date} date - The date to extract the information from (default: current date).
 * @returns {Object} An object containing the day of the week, day of the month, month, and year.
 * @throws {Error} If there is an error while retrieving the date information.
 */
export const getDate = (date: Date = new Date()): TDate => {
  try {

    const d = new Date(date)

    return {
      dayWeek: days[d.getDay()],
      day: d.getDate(),
      month: months[d.getMonth()].toLowerCase(),
      year: d.getFullYear()
    }

  } catch (error) {
    throw Error(`Error trying to get the date: ${error}`)
  }
}

export const deleteAtSign = (string: string): string | null => {
  if (string) {
    const text = string.split("@")
    return text[1] ? text[1] : text[0]
  }
  return null
}

export const formatEuroCalculateMessage = (toEuro: boolean, euro?: number, bolivar?: number): string => {
  return toEuro ? `*Euros calculados: € ${euro}*\n\n` : `*Bolívares calculados: Bs. ${bolivar}*\n\n`
}

export const formatCalculateMessage = (toDollar: boolean, dollar?: number, bolivar?: number): string => {
  return toDollar ? `*Dólares calculados: $ ${dollar}*\n\n` : `*Bolívares calculados: Bs. ${bolivar}*\n\n`
}

export const formatEuroEntityMessage = (entity: TEntity, calculate: boolean = false, toEuro: boolean = false): string => {
  const title = deleteAtSign(entity.info.title)
  const euro = entity.info.euro
  const updatedDate = entity.info.updatedDate

  return `- *${title}* -\nEuro: Bs. ${euro}\nFecha de actualización: ${updatedDate}\n${calculate && formatEuroCalculateMessage(toEuro, entity.euroCalculated ?? 0, entity.bolivarCalculated ?? 0)}`
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

    // Convert the date to the timezone
    return date.toLocaleString(locale, options)

  } catch (error) {
    console.log("Error trying to format date:", error)
    return null
  }
}