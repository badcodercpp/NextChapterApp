import { JournalCategory } from '../../types';

export type ChipVariant = 'vertical' | 'horizontal';

export interface CategoryChipProps {
  category?: JournalCategory;
  selected: boolean;
  variant?: ChipVariant;
}
