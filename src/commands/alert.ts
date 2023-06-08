import { Context } from 'telegraf'
import createDebug from 'debug'

const debug = createDebug('bot:alert_command')

export const alert = async (ctx: Context, activeUsers: number[]) => {
  const username = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name}`

  const id = ctx.chat?.id
  let message: string = ``

  if (id && !activeUsers.includes(id)) {
    activeUsers.push(id)
    message = `¡Enhorabuena ${username}! Los avisos diarios han sido activados.`
  } else if (id && activeUsers.includes(id)) {
    message = `No te preocupes ${username}, los avisos diarios ya se encuentran activados`
  } 

  debug(`Triggered "alert" command with message \n${message}`)
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' })
}
