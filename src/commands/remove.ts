import { Context } from "telegraf"
import createDebug from "debug"
import { getByColumn, update } from "../db"

const debug = createDebug("bot:remove_command")

export const remove = async (ctx: Context) => {

  
  const chatID = ctx.chat?.id.toString()
  const userID = ctx.message?.from.id.toString()
  const firstName = ctx.message?.from.first_name ?? ""

  let message: string = ``

  if (chatID && userID) {

    const user = await getByColumn("Users", ["chatID", "alertStatus"], [chatID, "true"])
    console.log(user)

    if (user && user.length > 0) {

      const response = await update("Users", ["chatID", "alertStatus"], [chatID, "false"], `chatID = "${chatID}"`)
      if (response) {
        message = `¡Enhorabuena ${firstName}! Los avisos diarios han sido removidos.`
      } else {
        message = `Lo lamento ${firstName}, no pudimos remover los avisos diarios.`
      }

    } else {
      message = `No te preocupes ${firstName}, los avisos diarios ya se encuentran desactivados.`
    }

  }

  debug(`Triggered "remove" command with message \n${message}`)
  await ctx.replyWithMarkdownV2(message, { parse_mode: "Markdown" })
}