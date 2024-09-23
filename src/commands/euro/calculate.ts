import { Context } from 'telegraf';
import createDebug from 'debug';
import { deleteAtSign, formatCalculateMessage, formatEuroEntityMessage } from '../../utils';
import EuroAPI from '../../api/euro/EuroAPI';
import { TData } from '../../types';

const debug = createDebug('bot:calculate_euro_command');

export const calculateEuro = async (ctx: Context, amount: number = 0, toEuro: boolean = false, entity: string = '') => {
  try {
    const euroAPI: EuroAPI = new EuroAPI();

    let message = `*Cálculo para el monto "${toEuro ? 'Bs ' : '€ '} ${amount}" en ${
      toEuro ? 'euros' : 'bolívares'
    }:*\n\n`;

    const response = toEuro ? await euroAPI.toEuro(amount, entity) : await euroAPI.toBs(amount, entity);
    const data = response.data.Data;

    message += entitiesData(data, toEuro);

    debug(`Triggered "calculate" command with message \n${message}`);

    await ctx.replyWithMarkdownV2(message, {
      parse_mode: 'Markdown',
    });
  } catch (error: unknown) {
    const firstName = ctx.message?.from.first_name ?? '';
    const message = `${firstName} tenemos una muy mala noticia, y es que no fue posible obtener los valores del euro 🥲\n\n${error}`;

    await ctx.replyWithMarkdownV2(message, {
      parse_mode: 'Markdown',
    });
  }
};

const entitiesData = (data: TData, toEuro: boolean) => {
  let message = '';

  if (data.entities) {
    const { entities, average } = data;

    for (const entity of entities) {
      if (entity.info.euro && entity.info.euro > 0) {
        message += formatEuroEntityMessage(entity, true, toEuro);
      }
    }

    message += `\n*Promedio calculado: ${toEuro ? '€' : 'Bs.'} ${average}*`;
  } else {
    const title = deleteAtSign(data.info?.title ?? '');
    const euro = data.info?.euro;
    const updatedDate = data.info?.updatedDate;

    const calculate = formatCalculateMessage(toEuro, data?.euroCalculated, data?.bolivarCalculated);
    message += `- *${title}* -\nEuro: Bs. ${euro}\nFecha de actualización: ${updatedDate}\n${calculate}\n`;
  }

  return message;
};
