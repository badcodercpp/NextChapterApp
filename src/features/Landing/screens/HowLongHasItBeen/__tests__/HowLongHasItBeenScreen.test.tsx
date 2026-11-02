import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { FormProvider, useForm } from 'react-hook-form';
import { HowLongHasItBeenScreen } from '../HowLongHasItBeenScreen';
import { TIMELINES } from '../../../constants';
import { useScreenHeader } from '@/navigation/hooks';

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
  CalendarClock: 'CalendarClock',
  Check: 'Check',
  ChevronLeft: 'ChevronLeft',
  Lock: 'Lock',
}));
jest.mock('@/navigation/hooks', () => ({ useScreenHeader: jest.fn() }));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack }),
}));
jest.mock('../../../constants', () => ({
  TIMELINES: [
    { id: 'TODAY', title: 'Today' },
    { id: 'WEEK', title: 'This week' },
    { id: 'MONTH', title: 'This month' },
    { id: 'MONTHS', title: 'A few months' },
    { id: 'YEAR', title: 'Over a year' },
  ].map(item => ({ ...item, subtitle: item.title, icon: 'Calendar' })),
}));
jest.mock('@/__generated__/graphql', () => ({
  RecoveryReasonTimeline: {
    Today: 'TODAY',
    Week: 'WEEK',
    Month: 'MONTH',
    Months: 'MONTHS',
    Year: 'YEAR',
  },
}));
jest.mock('@/form', () => jest.requireActual('@/form/schema/howLongHasItBeen'));
jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils/cn'),
  ...jest.requireActual('@/utils/fieldError'),
}));

function Harness() {
  const form = useForm({ defaultValues: { howLongHasItBeen: 'TODAY' } });
  return (
    <FormProvider {...form}>
      <HowLongHasItBeenScreen />
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

test('preserves the default timeline and replaces the old header', () => {
  expect(
    screen.root.findByProps({ accessibilityLabel: 'Today' }).props
      .accessibilityState.checked,
  ).toBe(true);
  expect(useScreenHeader).toHaveBeenCalledWith({ headerShown: false });
});

test.each(TIMELINES)(
  'selects $title exclusively and continues to feelings',
  item => {
    act(() => {
      screen.root
        .findByProps({ accessibilityLabel: item.title })
        .props.onPress();
    });
    const selected = TIMELINES.map(timeline =>
      screen.root.findByProps({ accessibilityLabel: timeline.title }),
    ).filter(card => card.props.accessibilityState.checked);
    expect(selected).toHaveLength(1);
    expect(selected[0].props.accessibilityLabel).toBe(item.title);
    act(() => {
      screen.root
        .findByProps({ accessibilityLabel: 'Continue' })
        .props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith('HowAreYouFeeling');
  },
);

test('back control goes back', () => {
  act(() => {
    screen.root.findByProps({ accessibilityLabel: 'Go back' }).props.onPress();
  });
  expect(mockGoBack).toHaveBeenCalledTimes(1);
});
