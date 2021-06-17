import { MCMessage } from './entities';
import { AttachedImageT, EmailAddressT, Mail } from '../Mail';

export const buildMCMessageFromMail = async (mail: Mail): Promise<MCMessage> => {
  const images = mail.getAttachedImages();

  const message: MCMessage = {
    html: mail.getHTML(),
    text: mail.getPlainText(),
    subject: mail.getSubject(),
    from_email: mail.getFrom().address,
    from_name: mail.getFrom().name,
    to: mail.getToRecipient().map((to: EmailAddressT) => ({
      email: to.address,
      name: to.name,
      type: 'to',
    })),
  };

  if (images.length > 0) {
    message.images = images.map(([id, { data, mimeType }]: [string, AttachedImageT]) => ({
      type: mimeType,
      name: id,
      content: data.toString('base64'),
    }));
  }

  return message;
};
