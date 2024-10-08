import { Context, Input } from 'telegraf';
import createDebug from 'debug';
import DollarAPI from '../../api/dollar/DollarAPI';
import imageGenerator from '../../utils/htmlToImage';
import { dateFormatter, getDate } from '../../utils';

const COMMAND = 'image';
const NAME = process.env.NAME;

const debug = createDebug(`bot:${COMMAND}`);

export const image = async (ctx: Context) => {
  try {
    const dollarAPI: DollarAPI = new DollarAPI();

    const response = await dollarAPI.get();
    const data = response.data.Data;

    const { dayWeek } = getDate(new Date()) ?? '';
    const date = dateFormatter();

    let message = `*${NAME}*\nValores del dólar al ${dayWeek.toLowerCase()} ${date}\n`;

    let image = await imageGenerator(data);

    if (typeof image === 'string') {
      image = Buffer.from(image);
    } else if (Array.isArray(image)) {
      image = image.map((item) => Buffer.from(item))[0];
    }

    const input = Input.fromBuffer(image, 'Image');

    message += `\n*Promedio general: Bs. ${data.average}*`;

    debug(`Triggered "${COMMAND}" with message: ${message}`);

    await ctx.replyWithPhoto(input, {
      caption: message,
      parse_mode: 'Markdown',
    });
  } catch (error: unknown) {
    const firstName = ctx.message?.from.first_name ?? '';
    const message = `${firstName} tenemos una muy mala noticia, y es que no fue posible obtener los valores del dólar 🥲\n\n${error}`;

    await ctx.replyWithMarkdownV2(message, {
      parse_mode: 'Markdown',
    });
  }
};
