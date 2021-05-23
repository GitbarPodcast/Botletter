import * as AirtableBase from 'airtable';
import { Persister } from '.';
import { Entry } from '../../core/entities';

export class Airtable implements Persister {
  private table: AirtableBase.Table<AirtableBase.FieldSet>;
  constructor(apiKey: string, app: string, table: string) {
    const conn = new AirtableBase({ apiKey }).base(app);
    this.table = conn(table);
  }

  async persist(entries: Entry[]): Promise<boolean> {
    try {
      const res = await this.table.create(entries);
      return res.length > 0;
    } catch (e) {
      return false;
    }
  }
}
