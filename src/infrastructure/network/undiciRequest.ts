import { Client } from 'undici';
import { RequestT } from './types';

const request: RequestT = async ({
  basePath,
  headers,
  method,
  path,
  body,
  responseParser = <K>(response: string) => response as unknown as K,
}) => {
  const client = new Client(basePath);
  const { body: responseBody } = await client.request({
    origin: '*',
    headers: Object.fromEntries(headers),
    method,
    path,
    body: JSON.stringify(body),
  });

  let responseString = '';

  for await (const data of responseBody) {
    responseString += data.toString();
  }

  return responseParser(responseString);
};

export default request;
