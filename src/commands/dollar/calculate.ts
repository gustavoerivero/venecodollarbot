import { Context } from 'telegraf';
import createDebug from 'debug';
import DollarAPI from '../../api/dollar/DollarAPI';
import { deleteAtSign, formatCalculateMessage, formatEntityMessage } from '../../utils';
import { TData } from '../../types';

const debug = createDebug('bot:calculate_command');

export const calculate = async (ctx: Context, amount: number = 0, toDollar: boolean = false, entity: string = '') => {
  try {
    const dollarAPI: DollarAPI = new DollarAPI();

    let message = `*Cálculo para el monto "${toDollar ? 'Bs ' : '$ '} ${amount}" en ${
      toDollar ? 'dólares' : 'bolívares'
    }:*\n\n`;

    const response = toDollar ? await dollarAPI.toDollar(amount, entity) : await dollarAPI.toBs(amount, entity);
    const data = response.data.Data;

    message += entitiesData(data, toDollar);

    debug(`Triggered "calculate" command with message \n${message}`);

    await ctx.replyWithMarkdownV2(message, {
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

const entitiesData = (data: TData, toDollar: boolean) => {
  let message = '';

  if (data.entities) {
    const { entities, average } = data;

    for (const entity of entities) {
      if (entity.info.dollar && entity.info.dollar > 0) {
        message += formatEntityMessage(entity, true, toDollar);
      }
    }

    message += `\n*Promedio calculado: ${toDollar ? '$' : 'Bs.'} ${average}*`;
  } else {
    const title = deleteAtSign(data.info?.title ?? '');
    const dollar = data.info?.dollar;
    const updatedDate = data.info?.updatedDate;

    const calculate = formatCalculateMessage(toDollar, data?.dollarCalculated, data?.bolivarCalculated);
    message += `- *${title}* -\nDólar: Bs. ${dollar}\nFecha de actualización: ${updatedDate}\n${calculate}\n`;
  }

  return message;
};
