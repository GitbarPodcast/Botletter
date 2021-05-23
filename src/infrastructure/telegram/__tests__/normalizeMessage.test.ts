import { Message as apiMessage } from 'typegram';
import { normalizeTelegramMessage } from '../normalizeMessage';

const fullMessage: apiMessage = {
  message_id: 1,
  from: {
    id: 1,
    username: 'test',
    is_bot: false,
    first_name: 'test',
  },
  chat: {
    type: 'group',
    title: 'gitbar',
    id: 1,
  },
  entities: [
    {
      type: 'hashtag',
      offset: 18,
      length: 5,
    },
    {
      type: 'url',
      offset: 24,
      length: 17,
    },
  ],
  text: 'Hello from gitbar #test https://gitbar.it',
  date: 1621801555002,
};

describe('normalizeMessage', () => {
  it('should convert the message when all valuable fields are provided', () => {
    const convertedMessage = normalizeTelegramMessage(fullMessage);
    expect(convertedMessage).toEqual({
      id: 1,
      chat: { id: 1, title: 'gitbar' },
      urls: ['https://gitbar.it'],
      hashtags: ['#test'],
      from: { id: 1, username: 'test' },
      date: '2021-05-23T20:25:55.002Z',
      text: 'Hello from gitbar #test https://gitbar.it',
    });
  });

  it('should convert the message when no hashtags are provided but only urls, and returns empty hashtags array', () => {
    const convertedMessage = normalizeTelegramMessage({
      ...fullMessage,
      entities: [
        {
          type: 'url',
          offset: 23,
          length: 17,
        },
      ],
      text: 'Hello from gitbar test https://gitbar.it',
    });

    expect(convertedMessage).toEqual({
      id: 1,
      chat: { id: 1, title: 'gitbar' },
      urls: ['https://gitbar.it'],
      hashtags: [],
      from: { id: 1, username: 'test' },
      date: '2021-05-23T20:25:55.002Z',
      text: 'Hello from gitbar test https://gitbar.it',
    });
  });

  it('should convert the message when no urls are provided but only hashtags, and returns empty urls array', () => {
    const convertedMessage = normalizeTelegramMessage({
      ...fullMessage,
      entities: [
        {
          type: 'hashtag',
          offset: 18,
          length: 5,
        },
      ],
      text: 'Hello from gitbar #test',
    });

    expect(convertedMessage).toEqual({
      id: 1,
      chat: { id: 1, title: 'gitbar' },
      urls: [],
      hashtags: ['#test'],
      from: { id: 1, username: 'test' },
      date: '2021-05-23T20:25:55.002Z',
      text: 'Hello from gitbar #test',
    });
  });

  it('should convert the message when no urls and hashtags are provided, returns empty arrays for both', () => {
    const convertedMessage = normalizeTelegramMessage({
      ...fullMessage,
      entities: [],
      text: 'Hello from gitbar',
    });

    expect(convertedMessage).toEqual({
      id: 1,
      chat: { id: 1, title: 'gitbar' },
      urls: [],
      hashtags: [],
      from: { id: 1, username: 'test' },
      date: '2021-05-23T20:25:55.002Z',
      text: 'Hello from gitbar',
    });
  });
});
