import { Telegraf } from 'telegraf';
import { MessageEntity } from 'typegram';

interface Process {
  (message: any): void;
}

export const setup = (botToken: string) => {
  const bot = new Telegraf(botToken);
  return (process: Process): void => {
    bot.on('message', (ctx) => {
      process(ctx.message);
      ctx.reply(
        'Attenzione, questo messaggio potrebbe finire tra i link della newsletter, contatta gli admin se non ti interessa che faccia quella fine',
      );
    });
    bot.launch();
    console.log('bot launched');
  };
};
