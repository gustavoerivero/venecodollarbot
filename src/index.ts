import { Telegraf } from 'telegraf'

import { about, dollar, entity, help, start, unknown } from './commands'
import { VercelRequest, VercelResponse } from '@vercel/node'
import { development, production } from './core'

const BOT_TOKEN = process.env.BOT_TOKEN ?? ''
const ENVIRONMENT = process.env.NODE_ENV ?? ''

const botName = process.env.BOT_NAME ?? ''

const bot = new Telegraf(BOT_TOKEN)

bot.command('about', about())

bot.command('start', start())
bot.command('help', help())

bot.command('dolar', dollar())
bot.on('text', async ctx => {

  const text = ctx.message.text.split(' ')

  if (text[1] && (text[0] === '/fuente' || text[0] === `/fuente${botName}`)) {
    await entity(ctx, text[1])
  }

  else {
    await unknown(ctx, ctx.message.text)
  }

})

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot)
}
//dev mode
ENVIRONMENT !== 'production' && development(bot)
