import { CronJob } from 'cron'
import { Context, Telegraf } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'
import createDebug from 'debug'

import DollarAPI from '../api/dollar/DollarAPI'
import { getByColumn } from '../db'
import { TUserBD } from '../types'

export const timezone = process.env.TIMEZONE ?? ''

const debug = createDebug('bot:cronjob')

export const sendDailyMessages = (bot: Telegraf<Context<Update>>) => {

  debug('Triggered "cronjob"')

  getDollarValues()
    .then(message => {
      getByColumn('Users', 'alertStatus', 'true')
        .then(users => {
          if (users && users.length > 0) {
            users.forEach((item: TUserBD) => {
              if (item?.chatid && message) {
                bot.telegram.sendMessage(item.chatid, message, {
                  parse_mode: 'Markdown'
                })
                  .catch(err => console.log('Sending schedule error: ', err))
              }
            })

          }
        })
        .catch(error => {
          debug('Error: ', error)
          console.log('Cronjob error: ', error)
        })

    })
    .catch(error => {
      debug('Error: ', error)
      console.log('Cronjob error: ', error)
    })

}

export const scheduleCronJob = (bot: Telegraf<Context<Update>>) => {

  const cronTime = process.env.CRON_TIME ?? '0 * * * *'

  const job = new CronJob(
    cronTime,
    () => sendDailyMessages(bot),
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