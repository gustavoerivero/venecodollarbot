import { Context } from 'telegraf'
import createDebug from 'debug'

import { menu } from '../utils'

const debug = createDebug('bot:about_command')

export const help = () => async (ctx: Context) => {

  debug(`Triggered "help" command with message \n${menu}`)
  
  await ctx.replyWithMarkdownV2(menu, {
    parse_mode: 'Markdown'
  })

}
