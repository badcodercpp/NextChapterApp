import {
  AppButton,
  AppCardDecoration,
  AppHeroArtwork,
  AppIcon,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import { TextInput, View } from 'react-native';

import { Star } from 'lucide-react-native';
import { cn } from '@/utils';
import { showToast } from '@/components/Toast';
import { useCSSVariable } from 'uniwind';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const STARS = [1, 2, 3, 4, 5];
const MAX_FEEDBACK_LENGTH = 250;
const RATING_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Okay',
  4: 'Good!',
  5: 'Excellent!',
};

export function RateUsScreen() {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [focused, setFocused] = useState(false);
  const onPrimary = useCSSVariable('--color-on-primary-v2');
  const placeholderColor = useCSSVariable('--color-text-muted-v2');
  const starColor = useCSSVariable('--color-link-v2');

  const handleSubmit = () => {
    showToast('Thanks for your feedback!', 'success');
    setRating(0);
    setFeedback('');
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <AppScreen
      scroll
      keyboard
      safeArea={false}
      safeTop={false}
      className="bg-background-v2"
      contentClassName="grow bg-background-v2 px-4 pb-8 pt-6"
    >
      <View className="-mx-4 -mt-6 items-center px-4 pb-2 pt-6">
        <AppHeroArtwork />
        <View className="h-20 w-20 items-center justify-center rounded-3xl bg-primary-v2">
          <AppIcon
            icon={Star}
            size={36}
            fill={typeof onPrimary === 'string' ? onPrimary : '#FFFFFF'}
            className="text-on-primary-v2"
          />
        </View>
        <AppText
          variant="3xl"
          className="mt-5 text-center font-bold text-text-v2"
        >
          Enjoying KhudSe?
        </AppText>
        <AppText
          variant="md"
          className="mt-2 max-w-[280px] text-center text-text-muted-v2"
        >
          Your feedback helps us make the app better for you.
        </AppText>
      </View>

      <View className="mt-8 flex-row justify-between gap-2">
        {STARS.map(value => {
          const active = value <= rating;
          return (
            <AppPressable
              key={value}
              accessibilityRole="button"
              accessibilityLabel={`${value} star${value > 1 ? 's' : ''}`}
              accessibilityState={{ selected: active }}
              className={cn(
                'aspect-square flex-1 items-center justify-center rounded-2xl border',
                active
                  ? 'border-primary-v2 bg-primary-v2/20'
                  : 'border-border-v2 bg-surface-v2',
              )}
              onPress={() => setRating(value)}
            >
              <AppIcon
                icon={Star}
                size={28}
                fill={
                  active && typeof starColor === 'string'
                    ? starColor
                    : 'transparent'
                }
                className={active ? 'text-link-v2' : 'text-text-muted-v2'}
              />
            </AppPressable>
          );
        })}
      </View>

      <View className="mt-4 h-7 items-center">
        <AppText
          variant={rating > 0 ? 'xl' : 'sm'}
          className={cn(
            rating > 0 ? 'font-semibold text-text-v2' : 'text-text-muted-v2',
          )}
        >
          {rating > 0 ? RATING_LABELS[rating] : 'Tap a star to rate'}
        </AppText>
      </View>

      <View
        className={cn(
          'mt-6 overflow-hidden rounded-3xl border bg-surface-v2 p-4',
          focused ? 'border-primary-v2' : 'border-border-v2',
        )}
      >
        <AppCardDecoration />
        <TextInput
          multiline
          value={feedback}
          maxLength={MAX_FEEDBACK_LENGTH}
          onChangeText={setFeedback}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Tell us what you like or how we can improve (optional)"
          placeholderTextColor={
            typeof placeholderColor === 'string' ? placeholderColor : undefined
          }
          textAlignVertical="top"
          className="min-h-24 text-base text-text-v2"
        />
        <AppText variant="sm" className="self-end text-text-muted-v2">
          {feedback.length}/{MAX_FEEDBACK_LENGTH}
        </AppText>
      </View>

      <View className="mt-auto pt-8">
        <AppButton
          title="Submit Rating"
          size="lg"
          fullWidth
          disabled={rating === 0}
          onPress={handleSubmit}
        />
      </View>
    </AppScreen>
  );
}
