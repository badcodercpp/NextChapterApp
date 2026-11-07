import {
  AppAuthenticatedLayout,
  AppButton,
  AppCard,
  AppExpandableText,
  AppIcon,
  AppText,
} from '@/components';
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  History,
  MessageCircle,
  Shield,
  Sprout,
} from 'lucide-react-native';
import { ActivityIndicator, Pressable, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectActiveJourney,
  selectApplicationConfig,
} from '@/state/selectors';
import {
  DailySessionStatus,
  useDailySessionHistoryByDayQuery,
} from '@/__generated__/graphql';
import { properCase } from '@/utils/strings';
import { getMoodEmojiByValue } from '@/utils';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { useResolveClassNames } from 'uniwind';

export function DailySessionHistoryScreen() {
  const { backgroundColor: accent } = useResolveClassNames('bg-primary-v2');
  const { data: journey } = useSelector(selectActiveJourney);
  const { data: config } = useSelector(selectApplicationConfig);
  const [pickedDay, setPickedDay] = useState<number | null>(null);
  const latestDay = Math.max(
    1,
    Math.min(
      journey?.currentDay ?? 1,
      config?.totalProgramDays ?? journey?.currentDay ?? 1,
    ),
  );
  const day = Math.min(pickedDay ?? latestDay, latestDay);
  const { currentData, isFetching, isError, refetch } =
    useDailySessionHistoryByDayQuery(
      { day },
      { skip: !journey, refetchOnMountOrArgChange: true },
    );
  const history = currentData?.dailySessionHistoryByDay;
  const reflections = [
    { label: 'What I learned', value: history?.reflection?.realization },
    { label: 'What felt meaningful', value: history?.reflection?.feeling },
    { label: 'What was challenging', value: history?.reflection?.need },
    { label: 'What I will carry forward', value: history?.reflection?.action },
  ];

  return (
    <AppAuthenticatedLayout>
      <View className="mt-4 mb-6 gap-4">
        <AppCard className="overflow-hidden rounded-[28px] border border-primary-v2/30 bg-background-v2 p-5">
          <View
            pointerEvents="none"
            className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary-v2/15"
          />
          <View className="mb-3 h-12 w-12 items-center justify-center rounded-[16px] bg-primary-v2/20">
            <AppIcon icon={History} size={28} className="text-link-v2" />
          </View>
          <AppText variant="xl" className="font-bold text-text-v2">
            Every step tells a story.
          </AppText>
          <AppText variant="sm" className="mt-2 leading-5 text-text-muted-v2">
            Revisit your conversations, small wins, and moments of growth.
          </AppText>
        </AppCard>

        <View className="overflow-hidden rounded-[24px] border border-primary-v2/40 bg-background-v2 p-3">
          <View pointerEvents="none" className="absolute inset-0">
            <Svg width="100%" height="100%">
              <Defs>
                <LinearGradient
                  id="historyDayBackground"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <Stop offset="0" stopColor={accent} stopOpacity={0.22} />
                  <Stop offset="0.5" stopColor={accent} stopOpacity={0.05} />
                  <Stop offset="1" stopColor={accent} stopOpacity={0.16} />
                </LinearGradient>
              </Defs>
              <Rect
                width="100%"
                height="100%"
                fill="url(#historyDayBackground)"
              />
            </Svg>
          </View>
          <View className="flex-row items-center justify-between gap-2">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Previous day"
              disabled={day <= 1}
              onPress={() => setPickedDay(day - 1)}
              className={`h-11 w-11 items-center justify-center rounded-[16px] border border-primary-v2/30 bg-background-v2/60 ${
                day <= 1 ? 'opacity-30' : ''
              }`}
            >
              <AppIcon icon={ChevronLeft} size={22} className="text-link-v2" />
            </Pressable>
            <View className="shrink flex-row items-center">
              <AppIcon
                icon={CalendarDays}
                size={22}
                className="mr-3 text-link-v2"
              />
              <View className="shrink">
                <AppText variant="xs" className="mb-0.5 text-text-muted-v2">
                  Session day
                </AppText>
                <AppText
                  variant="md"
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  className="font-bold text-text-v2"
                >
                  Day {day}
                  {config?.totalProgramDays
                    ? ` of ${config.totalProgramDays}`
                    : ''}
                </AppText>
              </View>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Next day"
              disabled={day >= latestDay}
              onPress={() => setPickedDay(day + 1)}
              className={`h-11 w-11 items-center justify-center rounded-[16px] border border-primary-v2/30 bg-background-v2/60 ${
                day >= latestDay ? 'opacity-30' : ''
              }`}
            >
              <AppIcon icon={ChevronRight} size={22} className="text-link-v2" />
            </Pressable>
          </View>
        </View>

        {isFetching ? (
          <View className="items-center py-12">
            <ActivityIndicator />
            <AppText variant="sm" className="mt-3 text-text-muted-v2">
              Loading your session...
            </AppText>
          </View>
        ) : isError ? (
          <AppCard className="rounded-[24px] border border-border-v2 bg-background-v2 p-5">
            <AppText variant="md" className="text-error">
              Unable to load this session.
            </AppText>
            <AppButton
              title="Try again"
              variant="primary"
              className="mt-4"
              onPress={() => refetch()}
            />
          </AppCard>
        ) : !history ? (
          <AppCard className="items-center rounded-[26px] border border-primary-v2/25 bg-background-v2 px-5 py-8">
            <AppIcon icon={Sprout} size={42} className="text-link-v2" />
            <AppText variant="lg" className="mt-4 font-semibold text-text-v2">
              No session saved for this day
            </AppText>
            <AppText
              variant="sm"
              className="mt-2 text-center leading-5 text-text-muted-v2"
            >
              Your saved daily sessions will appear here. Choose another day to
              look back.
            </AppText>
          </AppCard>
        ) : (
          <>
            <View className="flex-row items-center justify-between px-1">
              <AppText variant="lg" className="font-bold text-text-v2">
                Your session
              </AppText>
              <View className="flex-row items-center rounded-full bg-primary-v2/15 px-3 py-1.5">
                {history.dailySession.status ===
                  DailySessionStatus.Completed && (
                  <AppIcon
                    icon={CheckCircle2}
                    size={15}
                    className="mr-1.5 text-success"
                  />
                )}
                <AppText variant="xs" className="font-semibold text-link-v2">
                  {properCase(history.dailySession.status.replace(/_/g, ' '))}
                </AppText>
              </View>
            </View>
            {!!history.question?.conversation.length && (
              <AppCard className="rounded-[26px] border border-primary-v2/30 bg-background-v2 p-4">
                <View className="mb-4 flex-row items-center">
                  <AppIcon
                    icon={MessageCircle}
                    size={22}
                    className="mr-2 text-link-v2"
                  />
                  <AppText variant="lg" className="font-semibold text-link-v2">
                    Your conversation
                  </AppText>
                </View>
                {history.question.conversation.map((message, index) => (
                  <View
                    key={index}
                    className="mb-3 rounded-[18px] border border-primary-v2/20 bg-selected-v2/30 p-3"
                  >
                    <AppText
                      variant="xs"
                      className="mb-1 font-semibold text-link-v2"
                    >
                      {properCase(message.role)}
                    </AppText>
                    <AppExpandableText
                      text={message.content ?? message.question ?? undefined}
                      collapsedLines={4}
                      textClassName="leading-6 text-text-v2"
                      buttonTextClassName="text-link-v2"
                    />
                    {!!message.insight && (
                      <AppExpandableText
                        text={message.insight}
                        collapsedLines={3}
                        textClassName="mt-2 leading-5 text-text-muted-v2"
                        buttonTextClassName="text-link-v2"
                      />
                    )}
                    {!!message.reflection && (
                      <AppExpandableText
                        text={message.reflection}
                        collapsedLines={3}
                        textClassName="mt-2 leading-5 text-text-muted-v2"
                        buttonTextClassName="text-link-v2"
                      />
                    )}
                  </View>
                ))}
              </AppCard>
            )}
            {history.mission && (
              <AppCard className="rounded-[26px] border border-primary-v2/30 bg-background-v2 p-4">
                <View className="mb-3 flex-row items-center">
                  <AppIcon
                    icon={Shield}
                    size={23}
                    className="mr-2 text-link-v2"
                  />
                  <AppText variant="lg" className="font-semibold text-link-v2">
                    Your mission
                  </AppText>
                </View>
                <AppText variant="md" className="font-bold text-text-v2">
                  {history.mission.title}
                </AppText>
                <AppExpandableText
                  text={history.mission.description}
                  collapsedLines={3}
                  textClassName="mt-2 leading-6 text-text-muted-v2"
                  buttonTextClassName="text-link-v2"
                />
                {history.mission.steps.map((step, index) => (
                  <View
                    key={index}
                    className="mt-3 border-l-2 border-primary-v2/30 pl-3"
                  >
                    <AppText
                      variant="sm"
                      className="font-semibold text-text-v2"
                    >
                      {index + 1}. {step.title}
                    </AppText>
                    <AppExpandableText
                      text={step.description}
                      variant="sm"
                      collapsedLines={2}
                      textClassName="mt-1 leading-5 text-text-muted-v2"
                      buttonTextClassName="text-link-v2"
                    />
                  </View>
                ))}
              </AppCard>
            )}
            {history.reflection && (
              <AppCard className="rounded-[26px] border border-primary-v2/30 bg-background-v2 p-4">
                <View className="mb-3 flex-row items-center">
                  <AppIcon
                    icon={ClipboardList}
                    size={23}
                    className="mr-2 text-link-v2"
                  />
                  <AppText variant="lg" className="font-semibold text-link-v2">
                    Your reflections
                  </AppText>
                </View>
                {reflections
                  .filter(item => item.value)
                  .map(item => (
                    <View
                      key={item.label}
                      className="mb-3 rounded-[18px] bg-selected-v2/30 p-3"
                    >
                      <AppText
                        variant="sm"
                        className="font-semibold text-link-v2"
                      >
                        {item.label}
                      </AppText>
                      <AppExpandableText
                        text={item.value ?? undefined}
                        collapsedLines={3}
                        textClassName="mt-1 leading-6 text-text-v2"
                        buttonTextClassName="text-link-v2"
                      />
                    </View>
                  ))}
              </AppCard>
            )}
            {!!history.dailySession.endMoods.length && (
              <AppCard className="rounded-[24px] border border-primary-v2/25 bg-background-v2 p-4">
                <AppText variant="md" className="font-semibold text-link-v2">
                  How you felt afterwards
                </AppText>
                <View className="mt-3 flex-row flex-wrap gap-2">
                  {history.dailySession.endMoods.map(mood => (
                    <AppText
                      key={mood}
                      variant="sm"
                      className="rounded-full bg-primary-v2/10 px-3 py-2 text-text-v2"
                    >
                      {getMoodEmojiByValue(mood)}{' '}
                      {properCase(mood.replace(/_/g, ' '))}
                    </AppText>
                  ))}
                </View>
              </AppCard>
            )}
          </>
        )}
      </View>
    </AppAuthenticatedLayout>
  );
}
