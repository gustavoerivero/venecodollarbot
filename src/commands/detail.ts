import { Context } from 'telegraf'
import createDebug from 'debug'

import { commands } from '../utils'

const debug = createDebug('bot:detail_command')

export const detail = async (ctx: Context, command?: string) => {
  
  let message: string

  if (command) {
    const commandFound = commands.find(item => item.title === command)

    if (commandFound) {
      message = `*${commandFound.title}*\n\n- Comando: ${commandFound.command}\n- Descripción: ${commandFound.description}\n- Uso: ${commandFound.example}`
    } else {
      message = 'Lo lamento, no reconozco ese comando 😓.\n\nSi quieres saber de lo que soy capaz, por favor, utiliza /help para conocer los comandos disponibles.'
    }
  
  } else {

    message = '*Comandos disponibles*:\n\n'

    commands.forEach(item => {
      message += `*${item.title}*\n\n- Comando: ${item.command}\n- Descripción: ${item.description}\n- Uso: ${item.example}`
    })

  }

  debug(`Triggered "detail" command with message \n${message}`)
    
  await ctx.replyWithMarkdownV2(message, {
    parse_mode: 'Markdown'
  })

}
