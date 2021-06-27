import { generateId } from '../../../utils/string';
import { fromBuffer } from 'file-type';

export type EmailAddressT = {
  address: string;
  name: string;
};

type MailT = {
  subject: string;
  to: Array<EmailAddressT>;
  from: EmailAddressT;
  html: string;
  plainText: string | null;
};

export type AttachedImageT = {
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

  private images: Record<string, AttachedImageT> = {};

  private templateName: string | null = null;
  private templateContent: Record<string, string> = {};

  setSubject(subject: string): this {
    this._mail.subject = subject;
    return this;
  }

  addTo(email: EmailAddressT): this {
    this._mail.to.push(email);
    return this;
  }

  setFrom(email: EmailAddressT): this {
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

  async attachImage(buffer: Buffer, id?: string): Promise<string> {
    id = id ?? generateId();
    const mimeType = (await fromBuffer(buffer))?.mime ?? '';
    if (mimeType.substr(0, 6) !== 'image/') {
      throw new Error(`Image ${id} not recognized or not an image. mimetype "${mimeType}"`);
    }
    this.images[id] = { data: buffer, mimeType: mimeType };
    return id;
  }

  hasTemplate(): boolean {
    return this.templateName !== null;
  }

  getHTML(): string {
    return this._mail.html;
  }

  getPlainText(): string {
    return this._mail.plainText || '';
  }

  getSubject(): string {
    return this._mail.subject;
  }

  getFrom(): EmailAddressT {
    return this._mail.from;
  }

  getToRecipient(): Array<EmailAddressT> {
    return this._mail.to;
  }

  getAttachedImages(): [string, AttachedImageT][] {
    return Object.entries(this.images);
  }

  getTemplateName(): string | null {
    return this.templateName;
  }

  getTemplateContent(): Record<string, string> {
    return this.templateContent;
  }
}
