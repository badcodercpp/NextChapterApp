import { AIChatStackParamList } from '@/features/AIChat';
import { DailySessionHistoryStackParamList } from '@/features/DailySessionHistory/navigation';
import { DailySessionStackParamList } from '@/features/DailySession';
// import { AIStackParamList } from '@/features/ai/navigation';
import { HomeStackParamList } from '@/features/home/navigation';
import { JournalStackParamList } from '@/features/journal';
import { MentorChatStackParamList } from '@/features/mentors/navigation';
// import { JournalStackParamList } from '@/features/journal/navigation';
// import { JournalStackParamList } from '@/features/journal/navigation';
import { NavigatorScreenParams } from '@react-navigation/native';
import { RecoveryProgressStackParamList } from '@/features/RecoveryProgress/navigation';
// import { ProfileStackParamList } from '@/features/profile/navigation';
// import { ProgressStackParamList } from '@/features/progress/navigation';
import { TabRoutes } from './TabRoutes';

export type TabParamList = {
  [TabRoutes.Home]: NavigatorScreenParams<HomeStackParamList>;

  [TabRoutes.Journal]: NavigatorScreenParams<JournalStackParamList>;

  [TabRoutes.AI]: NavigatorScreenParams<AIChatStackParamList>;

  [TabRoutes.Progress]: NavigatorScreenParams<RecoveryProgressStackParamList>;

  [TabRoutes.Mentor]: NavigatorScreenParams<MentorChatStackParamList>;

  [TabRoutes.DailySessionTab]: NavigatorScreenParams<DailySessionStackParamList>;
  [TabRoutes.DailySessionHistoryTab]: NavigatorScreenParams<DailySessionHistoryStackParamList>;
};
