/*
 due the fact that some snake keys are wanted by Mailchimp json post
 we need to disallow eslint error for camelcase
 */

/* eslint-disable camelcase */

export interface TemplatePart {
  name: string;
  content: string;
}

export interface Recipient {
  email: string;
  name: string;
  type: string;
}

type AttachedImage = {
  type: string;
  name: string;
  content: string;
};

export interface MCMessage {
  html?: string;
  text?: string;
  subject: string;
  from_email: string;
  from_name: string;
  to: Array<Recipient>;
  headers?: Record<string, string>;
  return_path_domain?: string;
  tags?: Array<string>;
  images?: Array<AttachedImage>;
}

export interface PostMessage {
  key: string;
  message: MCMessage | null;
  async?: boolean;
  send_at?: string;
}

export interface PostTemplateMessage extends PostMessage {
  template_name: string;
  template_content: Array<TemplatePart>;
}

export type MailChimpResponseT = {
  email: string;
  status: 'sent' | 'queued' | 'scheduled' | 'rejected' | 'invalid';
  reject_reason?:
    | 'hard_bounce'
    | 'soft_bounce'
    | 'spam'
    | 'unsub'
    | 'custom'
    | 'invalid-sender'
    | 'invalid'
    | 'test-mode-limit'
    | 'unsigned'
    | 'rule';
  _id: string;
};
