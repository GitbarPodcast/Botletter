import { buildMCMessageFromMail } from '../buildMCMessageFromMail';
import { Mail } from '../../Mail';
import { BASE64_GIF } from '../../../../../utils/string';

describe('buildMCMessageFromMail', () => {
  test('send email with dryRun should return the an expected bodyPost', async () => {
    const mail = new Mail();
    const resourceId = await mail.attachImage(Buffer.from(BASE64_GIF, 'base64'), 'myEmbeddedImage');

    mail
      .setHTML(`<h1>Hello World</h1>`)
      .setPlainText('Hello world')
      .setFrom({ address: 'test@test.it', name: 'Test' })
      .addTo({ address: 'to@test.it', name: 'receiver test' })
      .setSubject('My subject');

    const mcMessage = await buildMCMessageFromMail(mail);

    expect(resourceId).toBe('myEmbeddedImage');

    expect(mcMessage).toStrictEqual({
      from_email: 'test@test.it',
      from_name: 'Test',
      html: `<h1>Hello World</h1>`,
      text: 'Hello world',
      images: [{ content: BASE64_GIF, name: 'myEmbeddedImage', type: 'image/gif' }],
      subject: 'My subject',
      to: [{ email: 'to@test.it', name: 'receiver test', type: 'to' }],
    });
  });

  test('attachImage must accept only images', () => {
    const mail = new Mail();
    expect(mail.attachImage(Buffer.from('simple ascii string', 'ascii'), 'myEmbeddedImage')).rejects.toThrowError(
      Error,
    );
  });
});
