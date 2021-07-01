type headerDescriptor = [string, string];
const contentTypes: Record<string, string> = {
  HTML: 'text/html',
  JSON: 'application/json',
};

const getMimetypeFor = (type: string) => {
  if (!Object.prototype.hasOwnProperty.call(contentTypes, type)) {
    throw new Error(`${type} is a not supported contentType`);
  }
  return contentTypes[type];
};

export const headerBuildBearerAuthorization = (token: string): headerDescriptor => ['authorization', `Bearer ${token}`];

export const headerBuildRequestBodyContentType = (type: string): headerDescriptor => [
  'content-type',
  getMimetypeFor(type),
];
