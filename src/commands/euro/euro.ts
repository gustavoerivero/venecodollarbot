import { Context } from 'telegraf'
import createDebug from 'debug'
import EuroAPI from '../../api/euro/EuroAPI'
import { dateFormatter, getDate } from '../../utils'

const debug = createDebug('bot:euro_command')

export const euro = () => async (ctx: Context) => {

  try {

    const { dayWeek } = getDate(new Date()) ?? ''
    const date = dateFormatter()

    const euroAPI: EuroAPI = new EuroAPI()

    let message = `*Valores del euro al ${dayWeek.toLowerCase()} ${date}*\n`

    const response = await euroAPI.get()
    const data = response.data.Data

    if (data.entities) {

      const { entities, average } = data

      for (const entity of entities) {
        const name = entity.info.title.split('@')
        const title = name[1] ? name[1] : name[0]
        const euro = entity.info.euro
        const updatedDate = entity.info.updatedDate

        if (euro && euro > 0) {
          message += `\n- *${title}* -\nEuro: Bs. ${euro}\nFecha de actualización: ${updatedDate}\n`
        }
      }

      message += `\n*Promedio general: Bs. ${average}*`

    }

    debug(`Triggered "euro" command with message \n${message}`)

    await ctx.replyWithMarkdownV2(message, {
      parse_mode: 'Markdown'
    })

  } catch (error: any) {

    const firstName = ctx.message?.from.first_name ?? ''    
    const message = `${firstName} tenemos una muy mala noticia, y es que no fue posible obtener los valores del euro 🥲\n\n${error}`

    await ctx.replyWithMarkdownV2(message, {
      parse_mode: 'Markdown'
    })
  }

}