import { Entry } from '../../core/entities/index';

export interface Store {
  create: (entries: Entry[]) => Promise<boolean>;
  setSent: (ids: string[]) => Promise<boolean>;
  getToSend: () => Promise<Array<Entry>>;
  getById: (id: string) => Promise<Entry>;
}
