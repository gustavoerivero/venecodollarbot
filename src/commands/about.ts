import { Context } from 'telegraf'
import createDebug from 'debug'

import { author, name, version, homepage } from '../../package.json'

const debug = createDebug('bot:about_command')

const about = () => async (ctx: Context) => {
  const message = `*${name} ${version}\n${homepage}*\n*Author: ${author}*`
  debug(`Triggered "about" command with message \n${message}`)
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' })
}

export { about }
