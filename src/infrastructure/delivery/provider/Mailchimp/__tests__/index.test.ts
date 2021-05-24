import { Sender } from '../index';
import { Mail } from '../../Mail';

const BASE64_GIF = 'R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

describe('sender flow with dryRun', () => {
  test('send email with dryRun should return a coherent bodyPost', async () => {
    const mail = new Mail();
    const resourceId = await mail.attachImage(Buffer.from(BASE64_GIF, 'base64'), 'myEmbeddedImage');

    mail
      .setHTML(`<h1>Hello World</h1><p>This is an image: <img src="cid:${resourceId}" alt="embedded image"></p>`)
      .setPlainText('Hello world this is an image: embedded image')
      .setFrom({ address: 'test@test.it', name: 'Test' })
      .addTo({ address: 'to@test.it', name: 'receiver test' })
      .setSubject('My subject');

    const sender = new Sender('justTest');
    sender.dryRun(true);
    const response = await sender.send(mail);

    expect(response.status).toBe('dryRun');
    expect(() => JSON.parse(response.message)).not.toThrow('response.message must be a valid json');
    expect(JSON.parse(response.message).bodyPost).toStrictEqual({
      key: 'justTest',
      message: {
        from_email: 'test@test.it',
        from_name: 'Test',
        html: `<h1>Hello World</h1><p>This is an image: <img src="cid:${resourceId}" alt="embedded image"></p>`,
        text: 'Hello world this is an image: embedded image',
        images: [{ content: BASE64_GIF, name: 'myEmbeddedImage', type: 'image/gif' }],
        subject: 'My subject',
        to: [{ email: 'to@test.it', name: 'receiver test', type: 'to' }],
      },
    });
  });
});
