import { Context } from 'telegraf'
import createDebug from 'debug'

const debug = createDebug('bot:remove_command')

const remove = () => async (ctx: Context) => {
  const username = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name}`

  const message = `Disculpa ${username}, pero el comando actualmente no se encuentra disponible 😔.`
  debug(`Triggered "alert" command with message \n${message}`)
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' })
}

export { remove }
