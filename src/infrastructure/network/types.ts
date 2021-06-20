export interface RequestProps<T> {
  basePath: string;
  authorization: string;
  method: 'POST' | 'GET' | 'PATCH';
  path: string;
  body?: T;
  content: 'JSON' | 'HTML';
}

export type RequestT = <T, K>(props: RequestProps<T>) => Promise<K>;
