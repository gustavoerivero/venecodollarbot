import { Context } from 'telegraf'
import createDebug from 'debug'
import DollarAPI from '../api/dollar/DollarAPI'

const debug = createDebug('bot:about_command')

export const entity = async (ctx: Context, entityName: string) => {

  try {

    const dollarAPI: DollarAPI = new DollarAPI()

    let message = `*Valores del dólar para la entidad "${entityName}":*\n`

    const response = await dollarAPI.getEntity(entityName)
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

    } else {

      const name = data.info?.title.split('@') ?? ''
      const title = name[1] ? name[1] : name[0]
      const dollar = data.info?.dollar
      const updatedDate = data.info?.updatedDate

      message += `\n- *${title}* -\nDólar: Bs. ${dollar}\nFecha de actualización: ${updatedDate}\n`

    }

    debug(`Triggered "entity" command with message \n${message}`)

    await ctx.replyWithMarkdownV2(message, {
      parse_mode: 'Markdown'
    })

  } catch (error: any) {

    const username = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name}`
    const message = `${username} tenemos una muy mala noticia, y es que no fue posible obtener los valores del dólar 🥲\n\n${error}`

    await ctx.replyWithMarkdownV2(entityName, {
      parse_mode: 'Markdown'
    })
  }

}