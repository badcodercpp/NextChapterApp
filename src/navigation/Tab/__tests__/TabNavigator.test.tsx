import React, { useContext } from 'react';
import { Text } from 'react-native';
import { act, create } from 'react-test-renderer';
import { CardAccessContext } from '@/components/foundation/AppCard/CardAccess';
import { TabNavigator } from '../TabNavigator';

function MockAccess({ testID }: { testID: string }) {
  const access = useContext(CardAccessContext);
  return React.createElement(
    'Text',
    { testID },
    access?.locked ? 'locked' : 'unlocked',
  );
}

jest.mock('react-native', () => ({
  Pressable: 'Pressable',
  Text: 'Text',
  View: 'View',
}));
jest.mock('lucide-react-native', () => ({ LockKeyhole: 'LockKeyhole' }));
jest.mock('@/components/foundation/AppIcon', () => ({ AppIcon: () => null }));
jest.mock('@/components/foundation/AppText', () => ({ AppText: () => null }));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }: React.PropsWithChildren) => <>{children}</>,
    Screen: ({
      component: Component,
      children,
    }: {
      component?: React.ComponentType;
      children?: () => React.ReactNode;
    }) => (Component ? <Component /> : children?.()),
  }),
}));
jest.mock('@/features/home', () => ({
  HomeNavigator: () => <MockAccess testID="home" />,
}));
jest.mock('@/features/AIChat', () => ({
  AIChatNavigator: () => <MockAccess testID="ai" />,
}));
jest.mock('@/features/DailySessionHistory/navigation', () => ({
  DailySessionHistoryNavigator: () => <MockAccess testID="history" />,
}));
jest.mock('@/features/DailySession', () => ({
  DailySessionNavigator: () => null,
}));
jest.mock('@/features/journal', () => ({ JournalNavigator: () => null }));
jest.mock('@/features/mentors/navigation', () => ({
  MentorChatNavigator: () => null,
}));
jest.mock('@/features/RecoveryProgress/navigation', () => ({
  RecoveryProgressNavigator: () => null,
}));
jest.mock('../../components/CustomBottomTabBar', () => ({
  BottomTabBar: () => null,
}));

test('keeps session history accessible without unlocking other protected tabs', () => {
  let screen: ReturnType<typeof create>;
  act(() => {
    screen = create(
      <CardAccessContext.Provider
        value={{ locked: true, openPremium: jest.fn() }}
      >
        <TabNavigator />
      </CardAccessContext.Provider>,
    );
  });
  const text = (testID: string) =>
    screen!.root.findAllByProps({ testID }).find(node => node.type === Text)
      ?.children[0];
  expect(text('history')).toBe('unlocked');
  expect(text('home')).toBe('locked');
  expect(text('ai')).toBe('unlocked');
  act(() => screen!.unmount());
});
