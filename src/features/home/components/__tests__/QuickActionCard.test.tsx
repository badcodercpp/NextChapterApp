import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { AppCard } from '@/components';
import { BookOpen } from 'lucide-react-native';
import { QuickActionCard } from '../QuickActionCard';

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

let screen: ReactTestRenderer;
afterEach(() => act(() => screen?.unmount()));

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
