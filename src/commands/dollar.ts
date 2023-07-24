import { Context } from 'telegraf'
import createDebug from 'debug'
import DollarAPI from '../api/dollar/DollarAPI'
import { dateFormatter, getDate } from '../utils'

const debug = createDebug('bot:dollar_command')

export const dollar = () => async (ctx: Context) => {

  try {

    const { dayWeek } = getDate(new Date()) ?? ''
    const date = dateFormatter()

    const dollarAPI: DollarAPI = new DollarAPI()

    let message = `*Valores del dólar al ${dayWeek.toLowerCase()} ${date}*\n`

    const response = await dollarAPI.get()
    const data = response.data.Data

    if (data.entities) {

      const { entities, average } = data

      for (const entity of entities) {
        const name = entity.info.title.split('@')
        const title = name[1] ? name[1] : name[0]
        const dollar = entity.info.dollar
        const updatedDate = entity.info.updatedDate

        if (dollar > 0) {
          message += `\n- *${title}* -\nDólar: Bs. ${dollar}\nFecha de actualización: ${updatedDate}\n`
        }
      }

      message += `\n*Promedio general: Bs. ${average}*`

    }

    debug(`Triggered "dollar" command with message \n${message}`)

    await ctx.replyWithMarkdownV2(message, {
      parse_mode: 'Markdown'
    })

  } catch (error: any) {

    const firstName = ctx.message?.from.first_name ?? ''    
    const message = `${firstName} tenemos una muy mala noticia, y es que no fue posible obtener los valores del dólar 🥲\n\n${error}`

    await ctx.replyWithMarkdownV2(message, {
      parse_mode: 'Markdown'
    })
  }

}