import { Category, Entry } from '../../core/entities';
import { RequestT } from '../network/types';

interface AirtableProps {
  apiKey: string;
  app: string;
  table: string;
  request: RequestT;
}

interface Store {
  create: (entries: Entry[]) => Promise<boolean>;
  setSent: (ids: string[]) => Promise<boolean>;
  getToSend: () => Promise<Array<Entry>>;
  getById: (id: string) => Promise<Entry>;
}

interface AirtableFields {
  image: string;
  sharedBy: string;
  category: Category;
  title: string;
  shortText: string;
  link: string;
  sentDate?: Date;
}
interface AirtableEntry {
  id?: string;
  fields: AirtableFields;
  createdTime?: string;
}

interface SaveBodyMessage {
  records: Array<AirtableEntry>;
}

interface SetSentBodyMessage {
  records: Array<{ id: string; fields: Partial<AirtableFields> }>;
}

interface SaveResponse {
  records: Array<AirtableEntry>;
}

interface GetToSendResponse {
  records: Array<AirtableEntry>;
}

const entrytoAirtable = (entry: Entry): AirtableEntry => ({
  id: entry.id,
  fields: {
    image: entry.image,
    sharedBy: entry.sharedBy,
    category: entry.category,
    title: entry.title,
    shortText: entry.shortText,
    link: entry.link,
  },
});

const airtableToEntry = (airtableEntry: AirtableEntry): Entry => ({
  id: airtableEntry.id,
  image: airtableEntry.fields.image,
  sharedBy: airtableEntry.fields.sharedBy,
  title: airtableEntry.fields.title,
  shortText: airtableEntry.fields.shortText,
  link: airtableEntry.fields.link,
  category: airtableEntry.fields.category,
  createdAt: new Date(airtableEntry.createdTime ?? ''),
});

/**
 * _request_ is an implementation on RequestT type.
 * out of the box we provide undiciRequest that uses
 * undici lib under the hood.
 *
 * import airtable from './infrastructure/store/airtable';
 * import request from './infrastructure/network/undiciRequest';
 * import dotenv from 'dotenv';
 * dotenv.config();
 *
 * const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || '';
 * const AIRTABLE_BASE = process.env.AIRTABLE_BASE || '';
 * const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE || '';
 *
 * const store = airtable({ apiKey: AIRTABLE_API_KEY, app: AIRTABLE_BASE, table: AIRTABLE_TABLE, request });
 * store.create([{
 *  ... here the entity data structure
 * }])
 */
export default ({ apiKey, app, table, request }: AirtableProps): Store => {
  return {
    create: async (entries: Entry[]) => {
      const body = {
        records: entries.map((e) => entrytoAirtable(e)),
      };
      const result = await request<SaveBodyMessage, SaveResponse>({
        basePath: 'https://api.airtable.com',
        authorization: apiKey,
        method: 'POST',
        path: `/v0/${app}/${table}`,
        body,
        content: 'JSON',
      });

      return result?.records.length > 0;
    },
    setSent: async (ids: string[]) => {
      const body = {
        records: ids.map((id) => ({ id, fields: { sentDate: new Date() } })),
      };
      const result = await request<SetSentBodyMessage, SaveResponse>({
        basePath: 'https://api.airtable.com',
        authorization: apiKey,
        method: 'PATCH',
        path: `/v0/${app}/${table}`,
        body,
        content: 'JSON',
      });

      return result?.records.length === ids.length;
    },
    getToSend: async () => {
      const result = await request<undefined, GetToSendResponse>({
        basePath: 'https://api.airtable.com',
        authorization: apiKey,
        method: 'GET',
        path: `/v0/${app}/${table}?filterByFormula=({sentDate}="")`,
        content: 'JSON',
      });

      return result?.records.map(airtableToEntry);
    },
    getById: async (id) => {
      // return entry or fail
      const result = await request<undefined, AirtableEntry>({
        basePath: 'https://api.airtable.com',
        authorization: apiKey,
        method: 'GET',
        path: `/v0/${app}/${table}/${id}`,
        content: 'JSON',
      });

      return result && airtableToEntry(result);
    },
  };
};
