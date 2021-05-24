import { Mail } from './Mail';

export type ProviderResponse = {
  status: 'success' | 'error' | 'dryRun';
  message: string;
};

export interface Provider {
  schedule(date: Date): void;

  send(message: Mail): Promise<ProviderResponse>;

  dryRun(bool: boolean): void;
}

export async function providerFactory(providerName: string, config: string): Promise<Provider> {
  return new (await import(`./${providerName}/index`)).Sender(config);
}
