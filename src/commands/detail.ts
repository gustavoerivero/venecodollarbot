import { Context } from 'telegraf'
import createDebug from 'debug'

import { commands } from '../utils'

const debug = createDebug('bot:detail_command')

export const detail = async (ctx: Context, command?: string) => {
  
  let message: string

  if (command) {
    const commandFound = commands.find(item => item.title === command)

    if (commandFound) {
      message = `*Comando buscado "${commandFound.title}"*\n_- Comando:_ ${commandFound.command}\n_- Descripción:_ ${commandFound.description}\n_- Uso:_ ${commandFound.example}\n`
    } else {
      message = 'Lo lamento, no reconozco ese comando 😓.\n\nSi quieres saber de lo que soy capaz, por favor, utiliza /help para conocer los comandos disponibles.'
    }
  
  } else {

    message = '*Comandos disponibles*:\n\n'

    commands.forEach(item => {
      message += `*${item.title}*\n- Comando: ${item.command}\n- Descripción: ${item.description}\n- Uso: ${item.example}\n`
    })

  }

  debug(`Triggered "detail" command with message \n${message}`)
    
  await ctx.replyWithMarkdownV2(message, {
    parse_mode: 'Markdown'
  })

}
