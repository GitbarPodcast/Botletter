import { Entry } from '../../core/entities/index';

export interface Store {
  save(entries: Entry[]): Promise<boolean>;
}
