import { Context } from 'telegraf'
import createDebug from 'debug'

import { author, name, version, homepage } from '../../package.json'

const botName = process.env.BOT_NAME

const debug = createDebug('bot:about_command')

const about = () => async (ctx: Context) => {
  const message = `*${botName}*\n${name} ${version}\n${homepage}\n_Autor: ${author}_`
  debug(`Triggered "about" command with message \n${message}`)
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' })
}

export { about }
