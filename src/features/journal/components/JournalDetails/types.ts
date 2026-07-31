import { JournalCategory } from '../../types';
import { SceneVariant } from '@/components/foundation/SceneIllustration/scenes/types';
import { UserMood } from '@/constants';

export interface JournalAction {
  title: string;

  icon: any;

  destructive?: boolean;

  onPress: () => void;
}

export interface JournalDetails {
  id: string;

  title: string;

  emoji: string;

  mood: UserMood;

  category: JournalCategory;

  createdAt: Date;

  day: number;

  question: string;

  content: string;

  aiInsight?: string;

  bookmarked: boolean;
}

export interface JournalPresentation {
  scene: SceneVariant;

  moodBackground: string;

  chipBackground: string;

  chipColor: string;
}
