import { Provider, ProviderResponse } from '../entities';
import { Client } from 'undici';
import { buildMCMessageFromMail } from './buildMCMessageFromMail';
import { PostMessage } from './entities';
import { date2utc } from '../../../../utils/date';
import { Mail } from '../Mail';

const ENDPOINT_PROTOCOL_HOST = 'https://mandrillapp.com';
const ENDPOINT_BASE = '/api/1.0/';
const ENDPOINT_MESSAGES_SEND = `${ENDPOINT_BASE}messages/send`;
const ENDPOINT_MESSAGES_SEND_TEMPLATE = `${ENDPOINT_BASE}messages/send-template`;

const getEndpointFromMessage = (mail: Mail): string => {
  if (mail.hasTemplate()) return ENDPOINT_MESSAGES_SEND_TEMPLATE;

  return ENDPOINT_MESSAGES_SEND;
};

export class Sender implements Provider {
  private sendAt: Date | null = null;
  private readonly apiKey: string;
  private _dryRun = false;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  dryRun(isDryRun: boolean): void {
    this._dryRun = isDryRun;
  }

  schedule(date: Date): void {
    this.sendAt = date;
  }

  async send(mail: Mail): Promise<ProviderResponse> {
    const client = new Client(ENDPOINT_PROTOCOL_HOST);
    const mcMessage = await buildMCMessageFromMail(mail);

    const bodyPost: PostMessage = {
      key: '',
      message: mcMessage,
    };

    bodyPost.key = this.apiKey;

    if (this.sendAt) {
      bodyPost.send_at = date2utc(this.sendAt);
    }

    const endpoint = getEndpointFromMessage(mail);

    try {
      if (this._dryRun) {
        return {
          status: 'dryRun',
          message: JSON.stringify({
            endpoint,
            bodyPost,
          }),
        };
      } else {
        const { body } = await client.request({
          bodyTimeout: 0,
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
          path: endpoint,
          body: JSON.stringify(bodyPost),
        });
        let responseString = '';
        for await (const data of body) {
          responseString += data.toString();
        }
        const responseObj = JSON.parse(responseString);
        return {
          status: responseObj.status === 200 ? 'success' : 'error',
          message: responseString,
        };
      }
    } catch (e) {
      return {
        status: 'error',
        message: e.toString(),
      };
    }
  }
}
