import { DrawerActions, useNavigation } from '@react-navigation/native';
import { MoodSection, moods } from '../../components/MoodSection';

import { AppScreen } from '@/components/foundation/AppScreen';
import { HeaderSection } from '../../components/HeaderSection/HeaderSection';
import { JourneySection } from '../../components/JourneySection';
import React from 'react';
import { ReflectionSection } from '../../components/ReflectionSection';
import { TodayInsightSection } from '../../components/TodayInsightSection/TodayInsightSection';
import { homeMock } from '../../mocks/home';
import { todayInsight } from '../../components/TodayInsightSection/mock';

export function HomeScreen() {
  const navigation = useNavigation();
  return (
    <AppScreen scroll horizontalPadding="lg">
      <HeaderSection
        userName={homeMock.userName}
        greeting={homeMock.greeting}
        onMenuPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      />
      <JourneySection />
      <ReflectionSection />
      <MoodSection moods={moods} onSelectMood={() => {}} />
      <TodayInsightSection insight={todayInsight} />
    </AppScreen>
  );
}
