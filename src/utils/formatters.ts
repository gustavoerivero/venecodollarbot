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