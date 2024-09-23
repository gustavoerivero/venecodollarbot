import { Context } from 'telegraf';
import createDebug from 'debug';
import { UserDB, getByColumn } from '../db';

const debug = createDebug('bot:alert_command');

export const alert = async (ctx: Context) => {
  const chatID = ctx.chat?.id.toString();
  const userID = ctx.message?.from.id.toString();
  const firstName = ctx.message?.from.first_name ?? '';
  const lastName = ctx.message?.from.last_name ?? null;
  const username = ctx.message?.from.username ?? null;

  let message: string = ``;

  if (chatID && userID) {
    const user = await getByColumn('Users', ['chatID', 'alertStatus'], [chatID, 'true']);

    if (user && user.length > 0) {
      message = `No te preocupes ${firstName}, los avisos diarios ya se encuentran activados`;
    } else {
      const userBD: UserDB = new UserDB(userID, chatID, firstName, lastName, username);
      await userBD.create();

      message = `¡Enhorabuena ${firstName}! Los avisos diarios han sido activados.\n\nSolo queremos recordarte que esta función se encuentra en pruebas, por lo que puede que no funcione correctamente.`;
    }
  }

  debug(`Triggered "alert" command with message \n${message}`);
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};
