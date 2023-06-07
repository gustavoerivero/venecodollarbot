import { Telegraf } from 'telegraf'

import { about, dollar, entity, help, start, calculate, detail, unknown, alert, remove } from './commands'
import { VercelRequest, VercelResponse } from '@vercel/node'
import { development, production } from './core'

const BOT_TOKEN = process.env.BOT_TOKEN ?? ''
const ENVIRONMENT = process.env.NODE_ENV ?? ''

const bot = new Telegraf(BOT_TOKEN)

bot.command('about', about())

bot.command('start', start())
bot.command('help', help())

bot.command('dolar', dollar())

bot.command('avisos', alert())
bot.command('remover', remove())

bot.on('text', async ctx => {

  const { text } = ctx.message
  const [command, param1, param2, param3] = text.split(' ')

  if (param1) {

    if (command.startsWith('/fuente')) {

      await entity(ctx, param1)

    } else if (command.startsWith('/calcular') &&
      (param1 === '$' || param1.toLowerCase() === 'bs') &&
      param2
    ) {

      try {

        const amount = Number(param2)
        const toDollar = param1.toLowerCase() === 'bs'
        const entity = param3 ?? ''
        await calculate(ctx, amount, toDollar, entity)

      } catch (error) {
        await unknown(ctx, text, true, 'El monto que proporcionas no lo comprendo 🫠.')
      }

    } else if (command.startsWith('/detalle')) {

      await detail(ctx, param1)

    } else {

      await unknown(ctx, text)

    }
  } else if (command.startsWith('/detalle')) {

    await detail(ctx)

  } else {

    await unknown(ctx, text)

  }
})


//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot)
}

//dev mode
ENVIRONMENT !== 'production' && development(bot)
