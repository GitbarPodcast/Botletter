import { Mail } from './Mail';
import { RequestT } from '../../network/types';

export type ResponseT = {
  fails: Record<string, string>;
  success: Record<string, string>;
  pending: Record<string, string>;
  extra?: string;
};

export type ProviderResponseT = {
  status: 'success' | 'error';
  message: ResponseT;
};

export interface Provider {
  schedule(date: Date): void;

  send(message: Mail, request: RequestT): Promise<ProviderResponseT>;
}

export async function providerFactory(providerName: string, config: string): Promise<Provider> {
  return new (await import(`./${providerName}/index`)).Sender(config);
}
