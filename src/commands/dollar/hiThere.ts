import { Context, Input } from "telegraf"
import createDebug from "debug"
import DollarAPI from "../../api/dollar/DollarAPI"
import imageGenerator from "../../utils/htmlToImage"

const debug = createDebug("bot:image")

export const hiThere = () => async (ctx: Context) => {

  try {

    const dollarAPI: DollarAPI = new DollarAPI()

    const response = await dollarAPI.get()
    const data = response.data.Data

    let image = await imageGenerator(data);

    if (typeof image === "string") {
      image = Buffer.from(image);
    } else if (Array.isArray(image)) {
      image = image.map(item => Buffer.from(item))[0];
    }

    const input = Input.fromBuffer(image, "Image");

    debug(`Triggered "hi"`)

    await ctx.replyWithPhoto(input);

  } catch (error: any) {

    const firstName = ctx.message?.from.first_name ?? ""    
    const message = `${firstName} tenemos una muy mala noticia, y es que no fue posible obtener los valores del dólar 🥲\n\n${error}`

    await ctx.replyWithMarkdownV2(message, {
      parse_mode: "Markdown"
    })
  }

}