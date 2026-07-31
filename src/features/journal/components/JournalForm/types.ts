import { Journal } from '../../types';

export interface JournalFormProps {
  mode?: 'create' | 'edit';

  journal?: Journal;
}
