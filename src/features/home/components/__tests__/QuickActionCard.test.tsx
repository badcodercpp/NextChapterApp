import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { AppCard } from '@/components';
import { BookOpen } from 'lucide-react-native';
import { QuickActionCard } from '../QuickActionCard';

let mockCardAccess: { locked: boolean; openPremium: () => void } | null = null;

jest.mock('@/components', () => {
  const { View, Text, Pressable } = jest.requireActual('react-native');
  return {
    AppCard: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <View {...props}>{children}</View>
    ),
    AppIcon: View,
    AppPressable: Pressable,
    AppText: Text,
  };
});
jest.mock('lucide-react-native', () => ({ BookOpen: 'BookOpen' }));
jest.mock('@/components/foundation/AppCard/CardAccess', () => ({
  useCardAccess: () => mockCardAccess,
}));

let screen: ReactTestRenderer;
afterEach(() => {
  act(() => screen?.unmount());
  mockCardAccess = null;
});

test.each(['text-primary', 'text-secondary'])(
  '%s accent does not replace the semantic card border or its action',
  accentClassName => {
    const onPress = jest.fn();
    act(() => {
      screen = create(
        <QuickActionCard
          icon={BookOpen}
          title="Journal"
          description="Reflect on today"
          actionLabel="Start journaling"
          accentClassName={accentClassName}
          onPress={onPress}
        />,
      );
    });
    const card = screen.root.findByType(AppCard);
    expect(card.props.className).toContain('border border-border');
    expect(card.props.className).not.toContain('text-primary');
    expect(card.props.className).not.toContain('text-secondary');
    act(() => {
      screen.root.findByProps({ className: 'w-[48%]' }).props.onPress();
    });
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(screen.toJSON())).toContain('Reflect on today');
  },
);

test('redirects a locked card to premium but keeps exempt cards accessible', () => {
  const openPremium = jest.fn();
  const onPress = jest.fn();
  mockCardAccess = { locked: true, openPremium };

  const card = (lockExempt = false) => (
    <QuickActionCard
      icon={BookOpen}
      title="AI Coach"
      description="Chat"
      actionLabel="Open"
      onPress={onPress}
      lockExempt={lockExempt}
    />
  );
  act(() => {
    screen = create(card());
  });
  let action = screen.root.findByProps({ className: 'w-[48%]' });
  expect(action.props.accessible).toBe(false);
  act(() => action.props.onPress());
  expect(openPremium).toHaveBeenCalledTimes(1);
  expect(onPress).not.toHaveBeenCalled();

  act(() => screen.update(card(true)));
  action = screen.root.findByProps({ className: 'w-[48%]' });
  expect(action.props.accessible).toBe(true);
  expect(screen.root.findByType(AppCard).props.lockExempt).toBe(true);
  act(() => action.props.onPress());
  expect(onPress).toHaveBeenCalledTimes(1);
});
