import { Telegraf } from 'telegraf';
import { Message, messageHasHashtags, messageHasUrls } from '.';
import { normalizeTelegramMessage } from './normalizeMessages';

interface Process {
  (message: Message): void;
}

interface Listener {
  (process: Process): void;
}

export const setup = (botToken: string): Listener => {
  const bot = new Telegraf(botToken);
  return (p: Process): void => {
    bot.on('message', (ctx) => {
      const message = ctx.update.message;
      if ('text' in message) {
        const normalizedMessage = normalizeTelegramMessage(message);
        if (messageHasHashtags(normalizedMessage) && messageHasUrls(normalizedMessage)) {
          p(normalizedMessage);
          ctx.reply(
            'Attenzione, questo messaggio potrebbe finire tra i link della newsletter, contatta gli admin se non ti interessa che faccia quella fine',
          );
        }
      }
    });
    bot.launch();
    console.log('bot launched');
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  };
};
