import { Provider, ProviderResponseT, ResponseT } from '../entities';
import { buildMCMessageFromMail } from './buildMCMessageFromMail';
import { MailChimpResponseT, PostMessage } from './entities';
import { date2YodaTime } from '../../../../utils/date';
import { EmailAddressT, Mail } from '../Mail';
import { RequestT } from '../../../network/types';

const ENDPOINT_PROTOCOL_HOST = 'https://mandrillapp.com';
const ENDPOINT_BASE = '/api/1.0/';
const ENDPOINT_MESSAGES_SEND = `${ENDPOINT_BASE}messages/send`;
const ENDPOINT_MESSAGES_SEND_TEMPLATE = `${ENDPOINT_BASE}messages/send-template`;

const getEndpointFromMessage = (mail: Mail): string => {
  if (mail.hasTemplate()) return ENDPOINT_MESSAGES_SEND_TEMPLATE;

  return ENDPOINT_MESSAGES_SEND;
};

const buildResponseFromMailchimpResponse = (response: MailChimpResponseT[]): ResponseT => {
  return response.reduce(
    (accumulator: ResponseT, current: MailChimpResponseT) => {
      switch (current.status) {
        case 'sent':
          accumulator.success[current.email] = current._id;
          break;
        case 'scheduled':
        case 'queued':
          accumulator.pending[current.email] = current._id;
          break;
        case 'invalid':
        case 'rejected':
          accumulator.fails[current.email] = current.reject_reason ?? current.status;
          break;
      }
      accumulator.extra += `${current.email} ${current.status}\n`;
      return accumulator;
    },
    { fails: {}, success: {}, pending: {}, extra: '' },
  );
};

export class Sender implements Provider {
  private sendAt: Date | null = null;
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  schedule(date: Date): void {
    this.sendAt = date;
  }

  async send(mail: Mail, request: RequestT): Promise<ProviderResponseT> {
    const mcMessage = await buildMCMessageFromMail(mail);

    const bodyPost: PostMessage = {
      key: this.apiKey,
      message: mcMessage,
    };

    if (this.sendAt) {
      bodyPost.send_at = date2YodaTime(this.sendAt);
    }

    const endpoint = getEndpointFromMessage(mail);

    try {
      const responseObj = <MailChimpResponseT[]>await request({
        basePath: ENDPOINT_PROTOCOL_HOST,
        authorization: '',
        body: bodyPost,
        method: 'POST',
        path: endpoint,
      });

      return {
        status: 'success',
        message: buildResponseFromMailchimpResponse(responseObj),
      };
    } catch (e) {
      mail
        .getToRecipient()
        .reduce((accumulator: Record<string, string>, current: EmailAddressT): Record<string, string> => {
          accumulator[current.address] = 'fails';
          return accumulator;
        }, {});
      return {
        status: 'error',
        message: { fails: {}, success: {}, pending: {}, extra: e.toString() },
      };
    }
  }
}
