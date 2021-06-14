import { Client } from 'undici';
import { RequestT } from './types';

const request: RequestT = async ({ basePath, authorization, method, path, body }) => {
  const client = new Client(basePath);
  const { body: responseBody } = await client.request({
    bodyTimeout: 0,
    headers: {
      authorization: `Bearer ${authorization}`,
      'content-type': 'application/json',
    },
    method,
    path,
    body: JSON.stringify(body),
  });

  let responseString = '';

  for await (const data of responseBody) {
    responseString += data.toString();
  }

  return JSON.parse(responseString);
};

export default request;
