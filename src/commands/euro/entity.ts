import { Context } from "telegraf"
import createDebug from "debug"
import EuroAPI from "../../api/euro/EuroAPI"
import { formatEuroEntityMessage } from "../../utils"

const debug = createDebug("bot:entity_euro_command")

export const entityEuro = async (ctx: Context, entityName: string) => {

  try {

    const euroAPI: EuroAPI = new EuroAPI()

    let message = `*Valores del euro para la entidad "${entityName}":*\n\n`

    const response = await euroAPI.getEntity(entityName)
    const data = response.data.Data

    if (data.entities) {

      const { entities, average } = data

      for (const entity of entities) {
        if (entity.info.euro && entity.info.euro > 0) {
          message += formatEuroEntityMessage(entity)
        }

      }

      message += `\n*Promedio general: Bs. ${average}*`

    } else {

      const name = data.info?.title.split("@") ?? ""
      const title = name[1] ? name[1] : name[0]
      const euro = data.info?.euro
      const updatedDate = data.info?.updatedDate

      message += `\n- *${title}* -\nEuro: Bs. ${euro}\nFecha de actualización: ${updatedDate}\n`

    }

    debug(`Triggered "entity" command with message \n${message}`)

    await ctx.replyWithMarkdownV2(message, {
      parse_mode: "Markdown"
    })

  } catch (error: any) {

    const firstName = ctx.message?.from.first_name ?? ""
    const message = `${firstName} tenemos una muy mala noticia, y es que no fue posible obtener los valores del euro 🥲\n\n${error}`

    await ctx.replyWithMarkdownV2(message, {
      parse_mode: "Markdown"
    })
  }

}