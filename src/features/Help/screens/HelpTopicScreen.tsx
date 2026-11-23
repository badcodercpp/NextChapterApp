import {
  APP_PATTERN_ARTWORK_VARIANTS,
  AppPatternArtwork,
  AppHeroArtwork,
  AppIcon,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import {
  ChevronRight,
  House,
  MessageSquareHeart,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react-native';
import { HELP_TOPICS, getHelpTopic } from '../data/helpTopics';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { Lightbulb } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { showToast } from '@/components/Toast';

import type { HelpStackParamList } from '../navigation/types';

export function HelpTopicScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HelpStackParamList>>();
  const { params } = useRoute<RouteProp<HelpStackParamList, 'HelpTopic'>>();
  const topic = getHelpTopic(params.topicId);

  if (!topic) {
    return null;
  }

  const related = HELP_TOPICS.filter(item => topic.related.includes(item.id));

  return (
    <AppScreen
      scroll
      safeArea={false}
      safeTop={false}
      className="bg-background-v2"
      contentClassName="grow bg-background-v2 px-4 pb-8 pt-3"
    >
      <View className="-mx-4 -mt-3 px-4 pb-2 pt-3">
        <AppHeroArtwork />
        <View className="flex-row items-center">
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Help"
            className="flex-row items-center"
            onPress={() => navigation.popToTop()}
          >
            <AppIcon icon={House} size={16} className="text-text-muted-v2" />
            <AppText variant="sm" className="ml-1.5 text-text-muted-v2">
              Help
            </AppText>
          </AppPressable>
          <AppIcon
            icon={ChevronRight}
            size={14}
            className="mx-1.5 text-text-muted-v2"
          />
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Popular Topics"
            onPress={() => navigation.popToTop()}
          >
            <AppText variant="sm" className="text-text-muted-v2">
              Popular Topics
            </AppText>
          </AppPressable>
          <AppIcon
            icon={ChevronRight}
            size={14}
            className="mx-1.5 text-text-muted-v2"
          />
          <AppText
            variant="sm"
            className="shrink font-semibold text-primary-v2"
            numberOfLines={1}
          >
            {topic.title}
          </AppText>
        </View>

        <View className="mt-5 flex-row items-center">
          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primary-v2/25">
            <AppIcon icon={topic.icon} size={28} className="text-primary-v2" />
          </View>
          <View className="ml-3 flex-1">
            <AppText variant="2xl" className="font-bold text-text-v2">
              {topic.title}
            </AppText>
            <AppText variant="sm" className="mt-0.5 text-text-muted-v2">
              {topic.subtitle}
            </AppText>
          </View>
          <AppIcon
            icon={topic.icon}
            size={72}
            className="ml-2 text-primary-v2/30"
          />
        </View>
      </View>

      <AppText variant="xl" className="mt-6 font-bold text-text-v2">
        Quick Overview
      </AppText>
      <AppText variant="md" className="mt-2 text-text-muted-v2">
        {topic.overview}
      </AppText>

      <AppText variant="xl" className="mb-3 mt-6 font-bold text-text-v2">
        Step-by-Step Guide
      </AppText>
      {topic.steps.map((step, index) => (
        <View key={step.title} className="mb-2 flex-row items-stretch">
          <View className="w-8 items-center">
            <View className="h-7 w-7 items-center justify-center rounded-full bg-primary-v2">
              <AppText variant="sm" className="font-bold text-on-primary-v2">
                {index + 1}
              </AppText>
            </View>
            {index < topic.steps.length - 1 && (
              <View className="mt-1 w-px flex-1 bg-primary-v2/40" />
            )}
          </View>
          <View className="ml-2 flex-1 flex-row items-center overflow-hidden rounded-2xl border border-primary-v2/30 bg-surface-v2 p-3">
            <AppPatternArtwork
              variant={
                APP_PATTERN_ARTWORK_VARIANTS[
                  (index + 2) % APP_PATTERN_ARTWORK_VARIANTS.length
                ]
              }
              icon={step.icon}
              className="w-2/5"
            />
            <View className="h-11 w-11 items-center justify-center rounded-xl bg-primary-v2/20">
              <AppIcon icon={step.icon} size={22} className="text-primary-v2" />
            </View>
            <View className="ml-3 flex-1">
              <AppText variant="md" className="font-semibold text-text-v2">
                {step.title}
              </AppText>
              <AppText variant="sm" className="mt-0.5 text-text-muted-v2">
                {step.description}
              </AppText>
            </View>
          </View>
        </View>
      ))}

      <View className="mt-4 flex-row items-center overflow-hidden rounded-2xl border border-primary-v2 bg-primary-v2/15 p-3">
        <AppPatternArtwork
          variant="sparkles"
          className="w-2/5"
          icon={Lightbulb}
        />
        <View className="h-11 w-11 items-center justify-center rounded-xl bg-primary-v2/25">
          <AppIcon icon={Lightbulb} size={22} className="text-primary-v2" />
        </View>
        <View className="ml-3 flex-1">
          <AppText variant="md" className="font-semibold text-primary-v2">
            Pro Tip
          </AppText>
          <AppText variant="sm" className="text-text-muted-v2">
            {topic.tip}
          </AppText>
        </View>
      </View>

      <View className="mt-4 flex-row items-center justify-between overflow-hidden rounded-2xl border border-border-v2 bg-surface-v2 p-3">
        <AppPatternArtwork
          variant="bubbles"
          className="w-2/5"
          icon={MessageSquareHeart}
          iconClassName="right-36"
        />
        <AppText variant="lg" className="font-bold text-text-v2">
          Was this helpful?
        </AppText>
        <View className="flex-row gap-2">
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Yes"
            className="h-10 flex-row items-center rounded-full border border-primary-v2 px-4"
            onPress={() => showToast('Thanks for your feedback!', 'success')}
          >
            <AppIcon icon={ThumbsUp} size={18} className="text-primary-v2" />
            <AppText variant="sm" className="ml-2 text-text-v2">
              Yes
            </AppText>
          </AppPressable>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="No"
            className="h-10 flex-row items-center rounded-full border border-primary-v2 px-4"
            onPress={() =>
              showToast('Sorry about that. Contact support for help.', 'info')
            }
          >
            <AppIcon icon={ThumbsDown} size={18} className="text-primary-v2" />
            <AppText variant="sm" className="ml-2 text-text-v2">
              No
            </AppText>
          </AppPressable>
        </View>
      </View>

      <AppText variant="xl" className="mb-3 mt-6 font-bold text-text-v2">
        Related Articles
      </AppText>
      {related.map((item, index) => (
        <AppPressable
          key={item.id}
          accessibilityRole="button"
          accessibilityLabel={item.title}
          className="mb-2 h-14 flex-row items-center overflow-hidden rounded-2xl border border-primary-v2/30 bg-surface-v2 px-4"
          onPress={() => navigation.push('HelpTopic', { topicId: item.id })}
        >
          <AppPatternArtwork
            variant={
              APP_PATTERN_ARTWORK_VARIANTS[
                (index + 4) % APP_PATTERN_ARTWORK_VARIANTS.length
              ]
            }
            icon={item.icon}
            className="w-2/5"
          />
          <AppIcon icon={item.icon} size={22} className="text-primary-v2" />
          <AppText variant="lg" className="ml-4 flex-1 text-text-v2">
            {item.title}
          </AppText>
          <AppIcon icon={ChevronRight} size={20} className="text-text-v2" />
        </AppPressable>
      ))}
    </AppScreen>
  );
}
