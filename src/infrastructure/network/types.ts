export interface RequestProps {
  basePath: string;
  authorization: string;
  method: 'POST' | 'GET' | 'PATCH';
  path: string;
  body?: unknown;
  content: 'JSON' | 'HTML';
}

export type RequestT = (props: RequestProps) => Promise<unknown>;
