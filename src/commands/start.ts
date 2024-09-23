import { Context } from 'telegraf';
import createDebug from 'debug';

import { menu } from '../utils';

const debug = createDebug('bot:start');

export const start = () => async (ctx: Context) => {
  const firstName = ctx.message?.from.first_name ?? '';

  const message = `¡Hola ${firstName}! A continuación te muestro las cosas que puedo hacer:\n\n${menu()}\nAsí que dime, ¿qué puedo hacer por ti?`;

  debug(`Triggered "start" command with message \n${message}`);

  await ctx.replyWithMarkdownV2(message, {
    parse_mode: 'Markdown',
  });
};
