import { Context } from 'telegraf'
import createDebug from 'debug'
import { get } from '../db'
import { unknown } from './unknown'
import { TUserBD } from '../types'

const debug = createDebug('bot:list')

const buildMessage = (users: TUserBD[]) => {

  let message = ''

  if (!users || users?.length === 0) {
    message = 'No hay información que mostrar... 🥺'
  } else {
    users.forEach(item => {

      const userType = Number(item.chatid) < 0 ? 'Grupo' : 'Usuario'
      const lastName = item.lastname && item.lastname !== 'null' && item.lastname !== 'undefined' ? ' ' + item.lastname : ''
      const alert = item.alertstatus ? 'Activados' : 'Desactivados'

      message += `\n*ID:* ${item.userid}`
      message += `\n*Chat ID:* ${item.chatid}`
      message += `\n*Tipo:* ${userType}`
      message += `\n*Usuario:* ${item.username}`
      message += `\n*Nombre:* ${item.firstname}${lastName}`
      message += `\n*Avisos:* ${alert}`
      message += '\n'
    })
  }

  return message

}

export const list = async (ctx: Context, text: string, param: string) => {

  try {

    const chatID = ctx.chat?.id.toString()
    const userID = ctx.message?.from.id.toString()

    const token = process.env.ACCESS_TOKEN

    if (param === token && chatID && userID) {

      const users: TUserBD[] = await get('Users') ?? []

      let message = buildMessage(users)

      debug(`Triggered "alert" command with message \n${message}`)
      await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' })

    } else {
      await unknown(
        ctx,
        text
      )
    }

  } catch (error) {
    await unknown(
      ctx,
      text
    )
  }

}
