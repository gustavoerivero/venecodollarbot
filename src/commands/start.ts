import { Context } from 'telegraf'
import createDebug from 'debug'

import { menu } from '../utils'

const debug = createDebug('bot:about_command')

export const start = () => async (ctx: Context) => {

  const username = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name}`
  const message = `¡Hola ${username}! A continuación te muestro las cosas que puedo hacer:\n${menu()}\nAsí que dime, ¿qué puedo hacer por ti?`

  debug(`Triggered "start" command with message \n${message}`)
  
  await ctx.replyWithMarkdownV2(message, {
    parse_mode: 'Markdown'
  })

}
