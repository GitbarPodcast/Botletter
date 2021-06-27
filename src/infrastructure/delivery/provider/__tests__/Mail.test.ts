import { Mail } from '../Mail';
import { BASE64_GIF } from '../../../../utils/string';

describe('mail class must set all properties', () => {
  test('attach image must work properly', async () => {
    const mail = new Mail();
    const imageId = await mail.attachImage(Buffer.from(BASE64_GIF, 'base64'), 'image_1');
    expect(imageId).toBe('image_1');
    expect(mail.getAttachedImages()).toStrictEqual([
      ['image_1', { data: Buffer.from(BASE64_GIF, 'base64'), mimeType: 'image/gif' }],
    ]);
  });

  test('simple setter and getter must do their job', () => {
    const mail = new Mail();
    mail.setHTML('<h1>Hello Test</h1>');
    expect(mail.getHTML()).toBe('<h1>Hello Test</h1>');

    mail.setSubject('my subject');
    expect(mail.getSubject()).toBe('my subject');

    mail.setFrom({ address: 'test@test.it', name: 'emailName' });
    expect(mail.getFrom()).toStrictEqual({ address: 'test@test.it', name: 'emailName' });

    mail.setPlainText('Hello Test');
    expect(mail.getPlainText()).toBe('Hello Test');

    mail.setTemplate('templateName');
    expect(mail.getTemplateName()).toBe('templateName');
  });

  test('complex setter and getter must do their job', () => {
    const mail = new Mail();
    mail.addTo({ address: 'test-addr@test.it', name: 'emailAddrName' });
    mail.addTo({ address: 'test-addr2@test.it', name: 'emailAddrName2' });
    mail.addTo({ address: 'test-addr3@test.it', name: 'emailAddrName3' });
    expect(mail.getToRecipient()).toStrictEqual([
      { address: 'test-addr@test.it', name: 'emailAddrName' },
      { address: 'test-addr2@test.it', name: 'emailAddrName2' },
      { address: 'test-addr3@test.it', name: 'emailAddrName3' },
    ]);

    mail.addTemplateContent('mySection', 'section content');
    expect(mail.getTemplateContent()).toStrictEqual({ mySection: 'section content' });
  });
});
