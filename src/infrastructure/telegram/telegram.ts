import { Telegraf } from 'telegraf';
import { MessageEntity } from 'typegram';
import { Message, messageHasHashtags, messageHasUrls } from '.';
import { normalizeTelegramMessage } from './normalizeMessages';

interface Process {
  (message: any): void;
}

export const setup = (botToken: string) => {
  const bot = new Telegraf(botToken);
  return (process: Process): void => {
    bot.on('message', (ctx) => {
      const messs = normalizeTelegramMessage(ctx.message as any);
      if (messageHasHashtags(messs) && messageHasUrls(messs)) {
        process(messs);
        ctx.reply(
          'Attenzione, questo messaggio potrebbe finire tra i link della newsletter, contatta gli admin se non ti interessa che faccia quella fine',
        );
      }
    });
    bot.launch();
    console.log('bot launched');
  };
};
