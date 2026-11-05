import {
  Brain,
  CheckCircle2,
  ClipboardCheck,
  HeartPulse,
  MessageCircleQuestion,
  type LucideIcon,
} from 'lucide-react-native';

import { AchievementType } from '@/__generated__/graphql';

const achievementTypeIcons: Record<AchievementType, LucideIcon> = {
  [AchievementType.SessionCompletion]: CheckCircle2,
  [AchievementType.MissionCompletion]: ClipboardCheck,
  [AchievementType.Reflection]: HeartPulse,
  [AchievementType.Question]: MessageCircleQuestion,
  [AchievementType.RecoveryScore]: Brain,
};

export const getAchievementTypeIcon = (type: AchievementType): LucideIcon => {
  return achievementTypeIcons[type];
};
