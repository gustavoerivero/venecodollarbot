import { Context } from 'telegraf';
import createDebug from 'debug';
import DollarAPI from '../../api/dollar/DollarAPI';
import { formatEntityMessage } from '../../utils';

const debug = createDebug('bot:entity_command');

export const entity = async (ctx: Context, entityName: string) => {
  try {
    const dollarAPI: DollarAPI = new DollarAPI();

    let message = `*Valores del dólar para la entidad "${entityName}":*\n\n`;

    const response = await dollarAPI.getEntity(entityName);
    const data = response.data.Data;

    if (data.entities) {
      const { entities, average } = data;

      for (const entity of entities) {
        if (entity.info.dollar && entity.info.dollar > 0) {
          message += formatEntityMessage(entity);
        }
      }

      message += `\n*Promedio general: Bs. ${average}*`;
    } else {
      const name = data.info?.title.split('@') ?? '';
      const title = name[1] ? name[1] : name[0];
      const dollar = data.info?.dollar;
      const updatedDate = data.info?.updatedDate;

      message += `\n- *${title}* -\nDólar: Bs. ${dollar}\nFecha de actualización: ${updatedDate}\n`;
    }

    debug(`Triggered "entity" command with message \n${message}`);

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
