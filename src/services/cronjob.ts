import { CronJob } from 'cron'
import { Context, Telegraf } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'
import createDebug from 'debug'

import DollarAPI from '../api/dollar/DollarAPI'

export const timezone = process.env.TIMEZONE ?? ''

const debug = createDebug('bot:cronjob')

export const sendDailyMessages = (bot: Telegraf<Context<Update>>, activeUsers: number[]) => {
  
  debug('Triggered "cronjob"')

  getDollarValues()
    .then(message => {
      for (const userId of activeUsers) {
        bot.telegram.sendMessage(userId, message ?? '', {
          parse_mode: 'Markdown'
        })
          .catch(err => debug(`Error: ${err}`))
      }
    })
    .catch(err => {
      debug(`Error: ${err}`)
    })
  
}

export const scheduleCronJob = (bot: Telegraf<Context<Update>>, activeUsers: number[]) => {

  const job = new CronJob(
    '0 9,13 * * *',
    () => sendDailyMessages(bot, activeUsers),
    null,
    true,
    timezone
  )

  job.start()

}

const getDollarValues = async () => {
  try {

    const dollarAPI: DollarAPI = new DollarAPI()

    const hour = new Date().getHours()
    const minutes = new Date().getMinutes()

    let message = `*Valores del dólar a las ${hour}:${minutes}*\n`

    const response = await dollarAPI.get()
    const data = response.data.Data

    if (data.entities) {

      const { entities, average } = data

      for (const entity of entities) {
        const name = entity.info.title.split('@')
        const title = name[1] ? name[1] : name[0]
        const dollar = entity.info.dollar
        const updatedDate = entity.info.updatedDate

        if (dollar > 0) {
          message += `\n- *${title}* -\nDólar: Bs. ${dollar}\nFecha de actualización: ${updatedDate}\n`
        }
      }

      message += `\n*Promedio general: Bs. ${average}*`

      return message

    }
  } catch (error) {
    return 'Lo lamento, pero no pudimos obtener los valores del dólar 😔.'
  }
}