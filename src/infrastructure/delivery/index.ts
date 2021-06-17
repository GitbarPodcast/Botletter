import { providerFactory } from './provider/entities';
import { Mail } from './provider/Mail';
import fakeRquest from '../network/fakeRquest';
const PROVIDER = process.env.MAIL_PROVIDER || 'Mailchimp';
const PROVIDER_CONFIG = process.env.MAIL_PROVIDER_CONFIG || 'missed_config';
const FROM_ADDRESS = process.env.MAIL_FROM_ADDRESS || 'info@test.it';
const FROM_NAME = process.env.MAIL_FROM_NAME || 'Gitbar podcast';

const mail = new Mail();

mail.setSubject('newsletter test').setFrom({ address: FROM_ADDRESS, name: FROM_NAME });

// TODO fetch mail content, subject and recipients somewhere

(async function () {
  const sender = await providerFactory(PROVIDER, PROVIDER_CONFIG);

  try {
    const response = await sender.send(mail, fakeRquest);
    console.log(response);
  } catch (e) {
    console.error('Send failed: ' + e.toString());
  }
})();
