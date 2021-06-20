import { Client } from 'undici';
import { RequestT } from './types';

const contentTypes = {
  HTML: 'text/html',
  JSON: 'application/json',
};

const request: RequestT = async ({ basePath, authorization, method, path, body, content }) => {
  const client = new Client(basePath);
  const { body: responseBody } = await client.request({
    origin: '*',
    headers: {
      authorization: `Bearer ${authorization}`,
      'content-type': contentTypes[content],
    },
    method,
    path,
    body: JSON.stringify(body),
  });

  let responseString = '';

  for await (const data of responseBody) {
    responseString += data.toString();
  }

  switch (content) {
    case 'JSON':
      return JSON.parse(responseString);
    default:
      return responseString;
  }
};

export default request;
