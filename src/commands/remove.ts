import { Context } from 'telegraf'
import createDebug from 'debug'

const debug = createDebug('bot:remove_command')

export const remove = async (ctx: Context, activeUsers: number[]) => {
  const username = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name}`

  const id = ctx.chat?.id ?? 0
  let message: string 

  if (id && activeUsers.includes(id)) {
    const index = activeUsers.indexOf(id)
    activeUsers.splice(index, 1)
    message = `¡Enhorabuena ${username}! Los avisos diarios han sido removidos.`
  } else {
    message = `No te preocupes ${username}, los avisos diarios ya se encuentran desactivados.`
  }

  debug(`Triggered "remove" command with message \n${message}`)
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' })
}