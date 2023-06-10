import { CronJob } from 'cron'
import { Context, Telegraf } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'
import createDebug from 'debug'

import DollarAPI from '../api/dollar/DollarAPI'
import { getByColumn } from '../db'
import { TUserBD } from '../types'

export const timezone = process.env.TIMEZONE ?? ''
export const locale = process.env.LOCALE ?? ''

const debug = createDebug('bot:cronjob')

export const sendDailyMessages = async (bot: Telegraf<Context<Update>>) => {

  let resp: TUserBD[] = []

  try {

    const message = await getDollarValues()

    const users = await getByColumn('Users', 'alertStatus', 'true')

    if (users && users.length > 0) {
      for (const user of users) {
        if (user?.chatid && message) {
          try {
            await bot.telegram.sendMessage(user.chatid, message, {
              parse_mode: 'Markdown'
            })
            resp.push(user)
            debug('Triggered "cronjob"')
          } catch (error) {
            console.log('Sending schedule error: ', error)
            debug(`Cronjob error: ${error}`)
          }
        }
      }
    }

    return resp

  }
  catch (error) {
    debug('Error: ', error)
    console.log('Cronjob error: ', error)
  }

}

const scheduleFunction = (bot: Telegraf<Context<Update>>) => {
  sendDailyMessages(bot)
    .catch(err => console.log(err))
}

export const scheduleCronJob = (bot: Telegraf<Context<Update>>) => {

  const cronTime = process.env.CRON_TIME ?? '0 9,13 * * 1-5'

  const job = new CronJob(
    cronTime,
    () => scheduleFunction(bot),
    null,
    true,
    timezone
  )

  job.start()

}

const getDollarValues = async () => {
  try {

    const dollarAPI: DollarAPI = new DollarAPI()

    const options = { timeZone: timezone, hour12: true }

    const currentDateTime = new Date()
    const hour = currentDateTime.toLocaleString(locale, { ...options, hour: '2-digit' })
    const minute = currentDateTime.toLocaleString(locale, { ...options, minute: '2-digit' })
    const day = currentDateTime.toLocaleString(locale, { ...options, day: '2-digit' })
    const month = currentDateTime.toLocaleString(locale, { ...options, month: '2-digit' })
    const year = currentDateTime.toLocaleString(locale, { ...options, year: 'numeric' })

    let message = `*Valores del dólar a las ${hour}:${minute} ${day}/${month}/${year}*\n`

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