/**
 * fakeRequest useful for debug: it prints and returns the same object input
 */
import { RequestT } from './types';

const request: RequestT = async ({ basePath, authorization, method, path, body }) => {
  console.log({ basePath, authorization, method, path, body });
  return JSON.parse(JSON.stringify({ basePath, authorization, method, path, body }));
};

export default request;
