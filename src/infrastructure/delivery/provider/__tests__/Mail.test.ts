import { Mail } from '../Mail';

const BASE64_GIF = 'R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

describe('mail class must set all properties', () => {
  test('attach image must work properly', async () => {
    const mail = new Mail();
    const imageId = await mail.attachImage(Buffer.from(BASE64_GIF, 'base64'), 'image_1');
    expect(imageId).toBe('image_1');
    expect(mail.getAttachedImages()).toStrictEqual([
      ['image_1', { data: Buffer.from(BASE64_GIF, 'base64'), mimeType: 'image/gif' }],
    ]);
  });
});
