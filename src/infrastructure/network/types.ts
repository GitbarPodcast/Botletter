export interface RequestProps<T, K> {
  basePath: string;
  method: 'POST' | 'GET' | 'PATCH';
  path: string;
  body?: T;
  headers: [string, string][];
  responseParser?: (response: string) => K;
}

export type RequestT = <T, K>(props: RequestProps<T, K>) => Promise<K>;
