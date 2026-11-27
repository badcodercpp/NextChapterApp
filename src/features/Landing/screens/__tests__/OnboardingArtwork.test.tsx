import React from 'react';
import { act, create } from 'react-test-renderer';
import { FormProvider, useForm } from 'react-hook-form';
import {
  AppCard,
  AppMountainArtwork,
  AppPatternArtwork,
  AppPressable,
} from '@/components';
import { Stop } from 'react-native-svg';
import { HowAreYouFeelingScreen } from '../HowAreYouFeeling/HowAreYouFeelingScreen';
import { WhatWouldYouLikeHelpWithScreen } from '../WhatWouldYouLikeHelpWith/WhatWouldYouLikeHelpWithScreen';
import { MeetYourAIScreen } from '../MeetYourAI/MeetYourAIScreen';
import { FEELINGS, FEATURES, GOALS } from '../../constants';

const mockContinue = jest.fn();
let mockBackground = '#ffffff';

jest.mock('react-native', () => ({
  Image: 'Image',
  ImageBackground: 'ImageBackground',
  ScrollView: 'ScrollView',
  View: 'View',
}));
jest.mock('react-native-svg', () => ({
  __esModule: true,
  default: 'Svg',
  Defs: 'Defs',
  LinearGradient: 'LinearGradient',
  Rect: 'Rect',
  Stop: 'Stop',
}));
jest.mock('uniwind', () => ({ useCSSVariable: () => mockBackground }));
jest.mock('@/components', () => ({
  APP_PATTERN_ARTWORK_VARIANTS: [
    'rings',
    'sparkles',
    'grid',
    'waves',
    'bubbles',
    'stripes',
  ],
  AppButton: 'AppButton',
  AppCard: 'AppCard',
  AppIcon: 'AppIcon',
  AppMountainArtwork: 'AppMountainArtwork',
  AppPatternArtwork: 'AppPatternArtwork',
  AppPressable: 'AppPressable',
  AppScreen: 'AppScreen',
  AppText: 'AppText',
}));
jest.mock('lucide-react-native', () => ({
  ArrowRight: 'ArrowRight',
  Check: 'Check',
  Heart: 'Heart',
  Lock: 'Lock',
}));
jest.mock('../../constants', () => ({
  FEELINGS: Array.from({ length: 9 }, (_, i) => ({
    id: `feeling-${i}`,
    title: `Feeling ${i}`,
    subtitle: `Feeling description ${i}`,
    emoji: '🙂',
  })),
  GOALS: Array.from({ length: 7 }, (_, i) => ({
    id: `goal-${i}`,
    title: `Goal ${i}`,
    subtitle: `Goal description ${i}`,
    icon: `GoalIcon${i}`,
  })),
  FEATURES: Array.from({ length: 4 }, (_, i) => ({
    id: `feature-${i}`,
    title: `Feature ${i}`,
    description: `Feature description ${i}`,
    icon: `FeatureIcon${i}`,
  })),
}));
jest.mock('@/utils', () => ({ cn: (...values: string[]) => values.join(' ') }));
jest.mock('../HowAreYouFeeling/useHowAreYouFeeling', () => ({
  useHowAreYouFeeling: () => ({
    control: jest.requireActual('react-hook-form').useFormContext().control,
    submitHowAreYouFeeling: mockContinue,
  }),
}));
jest.mock('../WhatWouldYouLikeHelpWith/useWhatWouldYouLikeHelpWith', () => ({
  useWhatWouldYouLikeHelpWith: () => ({
    control: jest.requireActual('react-hook-form').useFormContext().control,
    submitWhatWouldYouLikeHelpWith: mockContinue,
  }),
}));
jest.mock('../MeetYourAI/useMeetYourAI', () => ({
  useMeetYourAI: () => ({ submitMeetYourAI: mockContinue }),
}));

function Harness({ Screen }: { Screen: React.ComponentType }) {
  const form = useForm({
    defaultValues: {
      howAreYouFeeling: ['feeling-0'],
      whatWouldYouLikeHelpWith: ['goal-0'],
    },
  });
  return (
    <FormProvider {...form}>
      <Screen />
    </FormProvider>
  );
}

beforeEach(() => {
  mockContinue.mockClear();
});

test.each([
  { name: 'feelings', Screen: HowAreYouFeelingScreen, count: FEELINGS.length },
  {
    name: 'goals',
    Screen: WhatWouldYouLikeHelpWithScreen,
    count: GOALS.length,
  },
  { name: 'AI features', Screen: MeetYourAIScreen, count: FEATURES.length },
])(
  '$name cards have artwork and a theme-aware image fade',
  ({ Screen, count }) => {
    for (const background of ['#ffffff', '#141129']) {
      mockBackground = background;
      let screen: ReturnType<typeof create>;
      act(() => {
        screen = create(<Harness Screen={Screen} />);
      });
      const cards = screen!.root.findAllByType(AppCard);
      for (const card of cards.slice(0, count)) {
        expect(card.findAllByType(AppPatternArtwork)).toHaveLength(1);
      }
      if (Screen === MeetYourAIScreen) {
        expect(cards[count].findAllByType(AppMountainArtwork)).toHaveLength(1);
      }
      const stops = screen!.root.findAllByType(Stop);
      expect(stops.map(stop => stop.props.stopOpacity)).toEqual([0, 1]);
      expect(stops.map(stop => stop.props.stopColor)).toEqual([
        background,
        background,
      ]);
      act(() =>
        screen!.root.findByProps({ title: 'Continue' }).props.onPress(),
      );
      expect(mockContinue).toHaveBeenCalled();
      mockContinue.mockClear();
      act(() => screen!.unmount());
    }
  },
);

test.each([
  { name: 'feelings', Screen: HowAreYouFeelingScreen },
  { name: 'goals', Screen: WhatWouldYouLikeHelpWithScreen },
])('$name selection still works with artwork', async ({ Screen }) => {
  let screen: ReturnType<typeof create>;
  await act(async () => {
    screen = create(<Harness Screen={Screen} />);
  });
  const cards = screen!.root.findAllByType(AppPressable);
  expect(cards[0].findByType(AppCard).props.className).toContain(
    'bg-primary/25',
  );
  await act(async () => cards[1].props.onPress());
  expect(cards[0].findByType(AppCard).props.className).toContain(
    'bg-primary/25',
  );
  expect(cards[1].findByType(AppCard).props.className).toContain(
    'bg-primary/25',
  );
  act(() => screen!.unmount());
});
