import { Context } from 'telegraf'
import createDebug from 'debug'

import { menu, commands } from '../utils'

const debug = createDebug('bot:help_specify_command')

export const commandHelp = async (ctx: Context, command: string) => {

  const commandFound = commands.find(item => item.title === command)
  let message: string

  if (commandFound) {
    message = `*${commandFound.title}*\n\n- Comando: ${commandFound.command}\n- Descripción: ${commandFound.description}\n- Uso: ${commandFound.example}`
  } else {
    message = 'Lo lamento, no reconozco ese comando 😓.\n\nSi quieres saber de lo que soy capaz, por favor, utiliza /help para conocer los comandos disponibles.'
  }

  debug(`Triggered "help specify" command with message \n${menu()}`)
  
  await ctx.replyWithMarkdownV2(message, {
    parse_mode: 'Markdown'
  })

}
