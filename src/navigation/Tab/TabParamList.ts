// import { AIStackParamList } from '@/features/ai/navigation';
import { HomeStackParamList } from '@/features/home/navigation';
import { JournalStackParamList } from '@/features/journal/navigation';
// import { JournalStackParamList } from '@/features/journal/navigation';
import { NavigatorScreenParams } from '@react-navigation/native';
// import { ProfileStackParamList } from '@/features/profile/navigation';
// import { ProgressStackParamList } from '@/features/progress/navigation';
import { TabRoutes } from './TabRoutes';

export type TabParamList = {
  [TabRoutes.Home]: NavigatorScreenParams<HomeStackParamList>;

  [TabRoutes.Journal]: NavigatorScreenParams<JournalStackParamList>;

  [TabRoutes.AI]: NavigatorScreenParams<HomeStackParamList>;

  [TabRoutes.Progress]: NavigatorScreenParams<HomeStackParamList>;

  [TabRoutes.Profile]: NavigatorScreenParams<HomeStackParamList>;
};
