import { Context } from 'telegraf'
import createDebug from 'debug'

const debug = createDebug('bot:unknown')

export const unknown = async (ctx: Context, command: string) => {

  const username = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name}`
  const message = `Disculpa ${username}, pero no comprendí a qué te refieres con "${command}" 🥺.\n\nSi quieres saber de lo que soy capaz, por favor, utiliza /help para conocer los comandos disponibles.`

  debug(`Triggered "unknown" command with message \n${message}`)
  
  await ctx.replyWithMarkdownV2(message, {
    parse_mode: 'Markdown'
  })

}
