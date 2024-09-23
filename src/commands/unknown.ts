import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:unknown');

export const unknown = async (ctx: Context, command: string, personalized: boolean = false, text?: string) => {
  const firstName = ctx.message?.from.first_name ?? '';

  let message = `Disculpa ${firstName}, tuvimos un inconveniente.`;

  if (!personalized) {
    message += `No pude comprender a qué te refieres con "${command}" 🥺.`;
  } else {
    message += text;
  }

  message +=
    '\n\nSi quieres saber de lo que soy capaz, por favor, utiliza /help para conocer los comandos disponibles.';

  debug(`Triggered "unknown" command with message \n${message}`);

  await ctx.replyWithMarkdownV2(message, {
    parse_mode: 'Markdown',
  });
};
