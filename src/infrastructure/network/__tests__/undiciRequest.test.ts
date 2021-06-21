import { RequestOptions } from 'undici/types/dispatcher';
import request from '../undiciRequest';
import { headerBuildBearerAuthorization, headerBuildRequestBodyContentType } from '../builder/headers';

const mockClientRequest = jest.fn();

jest.mock('undici', () => {
  return {
    Client: jest.fn().mockImplementation(() => {
      return { request: mockClientRequest };
    }),
  };
});

describe('undici request supports multiple content types', () => {
  it('should call undici request with right HTML content type', async () => {
    mockClientRequest.mockImplementation(() => ({
      body: '<html><body>some html</body></html>',
    }));
    await request({
      basePath: 'https://gitbar.com',
      method: 'GET',
      path: '/index',
      headers: [headerBuildRequestBodyContentType('HTML')],
    });

    const expectedRequestOptions: RequestOptions = {
      origin: '*',
      headers: {
        'content-type': 'text/html',
      },
      method: 'GET',
      path: '/index',
      body: undefined,
    };
    expect(mockClientRequest).toBeCalledWith(expectedRequestOptions);
  });

  it('should call undici request with right JSON content type', async () => {
    mockClientRequest.mockImplementation(() => ({
      body: '{"body": "json body"}',
    }));
    await request({
      basePath: 'https://gitbar.com',
      method: 'GET',
      path: '/index',
      headers: [headerBuildRequestBodyContentType('JSON'), headerBuildBearerAuthorization('token')],
    });

    const expectedRequestOptions: RequestOptions = {
      origin: '*',
      headers: {
        authorization: `Bearer token`,
        'content-type': 'application/json',
      },
      method: 'GET',
      path: '/index',
      body: undefined,
    };
    expect(mockClientRequest).toBeCalledWith(expectedRequestOptions);
  });

  it('should return a valid HTML string', async () => {
    const htmlMock = '<html><body>some html</body></html>';
    mockClientRequest.mockImplementation(() => ({
      body: htmlMock,
    }));
    const data: string = await request({
      basePath: 'https://gitbar.com',
      method: 'GET',
      path: '/index',
      headers: [headerBuildRequestBodyContentType('HTML')],
    });

    expect(data).toBe(htmlMock);
  });
  it('should return a valid JSON response', async () => {
    const jsonMock = JSON.stringify({ body: 'content' });
    mockClientRequest.mockImplementation(() => ({
      body: jsonMock,
    }));
    const data: string = await request({
      basePath: 'https://gitbar.com',
      method: 'GET',
      path: '/index',
      headers: [headerBuildRequestBodyContentType('JSON')],
      responseParser: JSON.parse,
    });

    expect(JSON.stringify(data)).toBe(jsonMock);
  });
});
