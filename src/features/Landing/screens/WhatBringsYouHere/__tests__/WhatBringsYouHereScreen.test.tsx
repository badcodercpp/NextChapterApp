import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { FormProvider, useForm } from 'react-hook-form';
import { WhatBringsYouHereScreen } from '../WhatBringsYouHereScreen';
import { REASONS } from '../../../constants';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@/components', () => {
  const { View, Text, Pressable } =
    jest.requireActual<typeof import('react-native')>('react-native');
  return {
    AppScreen: View,
    AppText: Text,
    AppPressable: Pressable,
    AppIcon: View,
  };
});

jest.mock('lucide-react-native', () => ({
  ArrowRight: 'ArrowRight',
  Check: 'Check',
  ChevronLeft: 'ChevronLeft',
  HeartHandshake: 'HeartHandshake',
  Lock: 'Lock',
}));
jest.mock('@/navigation/hooks', () => ({ useScreenHeader: jest.fn() }));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack }),
}));
jest.mock('../../../constants', () => ({
  REASONS: [
    { id: 'BREAKUP', title: 'Going through a breakup' },
    { id: 'DIVORCE', title: 'Divorce / Separation' },
    { id: 'GRIEF', title: 'Grief & Loss' },
    { id: 'LONELY', title: 'Feeling Lonely' },
    { id: 'BURNOUT', title: 'Burnout' },
    { id: 'GROWTH', title: 'Personal Growth' },
  ].map(reason => ({ ...reason, description: reason.title, icon: 'Heart' })),
}));
jest.mock('@/__generated__/graphql', () => ({
  RecoveryReason: {
    Breakup: 'BREAKUP',
    Divorce: 'DIVORCE',
    Grief: 'GRIEF',
    Lonely: 'LONELY',
    Burnout: 'BURNOUT',
    Growth: 'GROWTH',
  },
}));
jest.mock('@/form', () =>
  jest.requireActual('@/form/schema/whatBringsYouHere'),
);
jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils/cn'),
  ...jest.requireActual('@/utils/fieldError'),
}));

function Harness() {
  const form = useForm({ defaultValues: { whatBringsYouHere: 'BREAKUP' } });
  return (
    <FormProvider {...form}>
      <WhatBringsYouHereScreen />
    </FormProvider>
  );
}

let screen: ReactTestRenderer;
beforeEach(() => {
  jest.clearAllMocks();
  act(() => {
    screen = create(<Harness />);
  });
});
afterEach(() => act(() => screen.unmount()));

test('shows every reason and preserves the initial selection', () => {
  expect(
    REASONS.map(reason =>
      screen.root.findByProps({ accessibilityLabel: reason.title }),
    ),
  ).toHaveLength(6);
  expect(
    screen.root.findByProps({ accessibilityLabel: REASONS[0].title }).props
      .accessibilityState.checked,
  ).toBe(true);
});

test.each(REASONS)(
  'selecting $title keeps exactly one reason checked',
  reason => {
    act(() => {
      screen.root
        .findByProps({ accessibilityLabel: reason.title })
        .props.onPress();
    });
    const selected = REASONS.map(item =>
      screen.root.findByProps({ accessibilityLabel: item.title }),
    ).filter(card => card.props.accessibilityState.checked);
    expect(selected).toHaveLength(1);
    expect(selected[0].props.accessibilityLabel).toBe(reason.title);
  },
);

test('continues to the existing timeline screen', () => {
  act(() => {
    screen.root.findByProps({ accessibilityLabel: 'Continue' }).props.onPress();
  });
  expect(mockNavigate).toHaveBeenCalledWith('HowLongHasItBeen');
});

test('back control preserves back navigation', () => {
  act(() => {
    screen.root.findByProps({ accessibilityLabel: 'Go back' }).props.onPress();
  });
  expect(mockGoBack).toHaveBeenCalledTimes(1);
});
