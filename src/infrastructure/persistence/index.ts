import { Entry } from '../../core/entities/index';

export interface Persister {
  persist(entries: Entry[]): Promise<boolean>;
}
