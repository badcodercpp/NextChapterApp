import {
  APP_PATTERN_ARTWORK_VARIANTS,
  AppHeroArtwork,
  AppIcon,
  AppPatternArtwork,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import {
  ChevronDown,
  ChevronRight,
  Headphones,
  Mail,
  MessageCircleQuestion,
  Search,
} from 'lucide-react-native';
import { Linking, TextInput, View } from 'react-native';

import type { HelpStackParamList } from '../navigation/types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HELP_TOPICS as TOPICS } from '../data/helpTopics';
import { cn } from '@/utils';
import { showToast } from '@/components/Toast';
import { useCSSVariable } from 'uniwind';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const SUPPORT_EMAIL = 'support@KhudSe';

const FAQS = [
  {
    id: 'free',
    question: 'Is KhudSe free to use?',
    answer:
      'Yes, you can get started for free. Premium unlocks all journeys and insights.',
  },
  {
    id: 'journey',
    question: 'How does the 90-day journey work?',
    answer:
      'You follow a guided daily plan over 90 days, with check-ins and tasks that help you heal at your own pace.',
  },
  {
    id: 'privacy',
    question: 'Is my data private and secure?',
    answer:
      'Your data is encrypted and never sold. You can delete your account and data at any time.',
  },
];

export function HelpScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HelpStackParamList>>();
  const [query, setQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const placeholderColor = useCSSVariable('--color-text-muted-v2');

  const search = query.trim().toLowerCase();
  const topics = TOPICS.filter(
    topic =>
      !search ||
      `${topic.title} ${topic.subtitle}`.toLowerCase().includes(search),
  );
  const faqs = FAQS.filter(
    faq =>
      !search || `${faq.question} ${faq.answer}`.toLowerCase().includes(search),
  );

  const contactSupport = () =>
    Linking.openURL(`mailto:${SUPPORT_EMAIL}`).catch(() =>
      showToast(`Email us at ${SUPPORT_EMAIL}`, 'info'),
    );

  return (
    <AppScreen
      scroll
      keyboard
      safeArea={false}
      safeTop={false}
      className="bg-background-v2"
      contentClassName="grow bg-background-v2 px-4 pb-8 pt-4"
    >
      <View className="-mx-4 -mt-4 px-4 pb-1 pt-4">
        <AppHeroArtwork />
        <AppText variant="sm" className="font-semibold text-primary-v2">
          KhudSe
        </AppText>
        <AppText variant="3xl" className="mt-1 font-bold text-text-v2">
          How can we help?
        </AppText>
        <AppText variant="sm" className="mt-1 max-w-[300px] text-text-muted-v2">
          Find answers, get support, and make the most of KhudSe.
        </AppText>
      </View>

      <View className="mt-5 flex-row items-center rounded-2xl border border-primary-v2/40 bg-surface-v2 px-4">
        <AppIcon icon={Search} size={20} className="text-primary-v2" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search for help, topics, or questions..."
          placeholderTextColor={
            typeof placeholderColor === 'string' ? placeholderColor : undefined
          }
          returnKeyType="search"
          className="ml-3 h-12 flex-1 text-base text-text-v2"
        />
      </View>

      {topics.length > 0 && (
        <>
          <AppText variant="xl" className="mb-3 mt-6 font-bold text-text-v2">
            Popular Topics
          </AppText>
          {topics.map((topic, index) => (
            <AppPressable
              key={topic.id}
              accessibilityRole="button"
              accessibilityLabel={topic.title}
              onPress={() =>
                navigation.navigate('HelpTopic', { topicId: topic.id })
              }
              className="mb-2 flex-row items-center overflow-hidden rounded-2xl border border-primary-v2/30 bg-surface-v2 p-2.5"
            >
              <AppPatternArtwork
                variant={
                  APP_PATTERN_ARTWORK_VARIANTS[
                    index % APP_PATTERN_ARTWORK_VARIANTS.length
                  ]
                }
                className="w-2/5"
                icon={topic.icon}
              />
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-primary-v2/20">
                <AppIcon
                  icon={topic.icon}
                  size={24}
                  className="text-primary-v2"
                />
              </View>
              <View className="ml-3 flex-1">
                <AppText variant="lg" className="font-semibold text-text-v2">
                  {topic.title}
                </AppText>
                <AppText variant="xs" className="text-text-muted-v2">
                  {topic.subtitle}
                </AppText>
              </View>
              <AppIcon icon={ChevronRight} size={20} className="text-text-v2" />
            </AppPressable>
          ))}
        </>
      )}

      {faqs.length > 0 && (
        <>
          <AppText variant="xl" className="mb-3 mt-5 font-bold text-text-v2">
            Frequently Asked Questions
          </AppText>
          <View className="overflow-hidden rounded-2xl border border-primary-v2/30 bg-surface-v2 px-4">
            <AppPatternArtwork
              variant="waves"
              className="h-32 w-full"
              icon={MessageCircleQuestion}
              iconClassName="bottom-auto top-2 right-12"
            />
            {faqs.map((faq, index) => {
              const open = openFaq === faq.id;
              return (
                <View
                  key={faq.id}
                  className={cn(index > 0 && 'border-t border-border-v2')}
                >
                  <AppPressable
                    accessibilityRole="button"
                    accessibilityState={{ expanded: open }}
                    className="flex-row items-center justify-between py-4"
                    onPress={() => setOpenFaq(open ? null : faq.id)}
                  >
                    <AppText variant="md" className="flex-1 pr-3 text-text-v2">
                      {faq.question}
                    </AppText>
                    <AppIcon
                      icon={open ? ChevronDown : ChevronRight}
                      size={20}
                      className="text-text-v2"
                    />
                  </AppPressable>
                  {open && (
                    <AppText
                      variant="sm"
                      className="-mt-1 pb-4 text-text-muted-v2"
                    >
                      {faq.answer}
                    </AppText>
                  )}
                </View>
              );
            })}
          </View>
        </>
      )}

      {topics.length === 0 && faqs.length === 0 && (
        <AppText variant="md" className="mt-10 text-center text-text-muted-v2">
          No results found. Try a different search or contact support.
        </AppText>
      )}

      <View className="mt-6">
        <AppPressable
          accessibilityRole="button"
          accessibilityLabel="Contact Support"
          className="h-14 flex-row items-center justify-center rounded-2xl bg-primary-v2"
          onPress={contactSupport}
        >
          <AppIcon icon={Headphones} size={22} className="text-on-primary-v2" />
          <AppText
            variant="lg"
            className="ml-3 font-semibold text-on-primary-v2"
          >
            Contact Support
          </AppText>
        </AppPressable>
        <View className="mt-3 flex-row items-center justify-center">
          <AppIcon icon={Mail} size={18} className="text-primary-v2" />
          <AppText variant="sm" className="ml-2 text-text-muted-v2">
            {SUPPORT_EMAIL}
          </AppText>
        </View>
      </View>
    </AppScreen>
  );
}
