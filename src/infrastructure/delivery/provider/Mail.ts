import { generateId } from '../../../utils/string';
import { fromBuffer } from 'file-type';

export type EmailAddress = {
  address: string;
  name: string;
};

type MailT = {
  subject: string;
  to: Array<EmailAddress>;
  from: EmailAddress;
  html: string;
  plainText: string | null;
};

export type AttachedImage = {
  data: Buffer;
  mimeType: string;
};

export class Mail {
  private _mail: MailT = {
    from: { address: '', name: '' },
    to: [],
    subject: '',
    html: '',
    plainText: null,
  };

  private images: Record<string, AttachedImage> = {};

  templateName: string | null = null;
  templateContent: Record<string, string> = {};

  setSubject(subject: string): this {
    this._mail.subject = subject;
    return this;
  }

  addTo(email: EmailAddress): this {
    this._mail.to.push(email);
    return this;
  }

  setFrom(email: EmailAddress): this {
    this._mail.from = email;
    return this;
  }

  setTemplate(name: string): this {
    this.templateName = name;
    return this;
  }

  addTemplateContent(section: string, content: string): this {
    this.templateContent[section] = content;
    return this;
  }

  setHTML(html: string): this {
    this._mail.html = html;
    return this;
  }

  setPlainText(text: string): this {
    this._mail.plainText = text;
    return this;
  }

  async attachImage(buffer: Buffer, id = ''): Promise<string> {
    if (id === '') id = generateId();
    const mimeType = (await fromBuffer(buffer))?.mime || '';
    if (mimeType.substr(0, 6) !== 'image/') {
      throw new Error(`Image ${id} not recognized or not an image. mimetype "${mimeType}"`);
    }
    this.images[id] = { data: buffer, mimeType: mimeType };
    return id;
  }

  hasTemplate(): boolean {
    return this.templateName !== null;
  }

  getHtml(): string {
    return this._mail.html;
  }

  getPlainText(): string {
    return this._mail.plainText || '';
  }

  getSubject(): string {
    return this._mail.subject;
  }

  getFrom(): EmailAddress {
    return this._mail.from;
  }

  getToRecipient(): Array<EmailAddress> {
    return this._mail.to;
  }

  getAttachedImages(): [string, AttachedImage][] {
    return Object.entries(this.images);
  }
}
