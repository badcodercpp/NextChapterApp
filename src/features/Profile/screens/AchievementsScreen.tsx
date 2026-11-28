import {
  APP_PATTERN_ARTWORK_VARIANTS,
  AppAuthenticatedLayout,
  AppCardDecoration,
  AppIcon,
  AppPatternArtwork,
  AppPressable,
  AppText,
} from '@/components';
import { ActivityIndicator, View } from 'react-native';
import {
  CalendarDays,
  Check,
  CircleCheck,
  Lock,
  Sparkles,
  Star,
  Target,
  Trophy,
} from 'lucide-react-native';
import {
  MyAchievementsQuery,
  NextAchievementQuery,
  useMyAchievementsQuery,
  useNextAchievementQuery,
} from '@/__generated__/graphql';
import React, { useState } from 'react';
import Svg, { Circle } from 'react-native-svg';

import { formatDistanceToNowStrict } from 'date-fns';
import { getAchievementTypeIcon } from '@/utils';
import { useCSSVariable } from 'uniwind';

type Achievement = MyAchievementsQuery['myAchievements'][0];
type NextAchievement = NonNullable<NextAchievementQuery['nextAchievement']>;
type Tab = 'unlocked' | 'locked';

const RING_SIZE = 96;
const RING_STROKE = 9;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function usePrimaryColor() {
  const primary = useCSSVariable('--color-primary-v2');
  const color =
    typeof primary === 'string' && /^#[0-9a-f]{6}$/i.test(primary)
      ? primary
      : '#7c3aed';
  return { color, track: `${color}26` };
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <View className="h-2 flex-1 overflow-hidden rounded-full bg-primary-v2/15">
      <View
        className="h-full rounded-full bg-primary-v2"
        style={{ width: `${Math.min(100, Math.round(progress * 100))}%` }}
      />
    </View>
  );
}

function HeroHeader() {
  return (
    <View className="-mx-4 mt-2 flex-row items-center overflow-hidden px-4 pb-2">
      <View
        pointerEvents="none"
        className="absolute -right-16 -top-10 h-56 w-56 rounded-full bg-primary-v2/10"
      />
      <View
        pointerEvents="none"
        className="absolute -left-20 bottom-0 h-24 w-72 rounded-full bg-primary-v2/5"
      />
      <View className="flex-1 pr-2">
        <AppText variant="md" className="font-semibold text-link-v2">
          KhudSe
        </AppText>
        <AppText variant="3xl" className="mt-1 font-bold text-text-v2">
          Your{' '}
          <AppText variant="3xl" className="font-bold text-link-v2">
            Achievements
          </AppText>
        </AppText>
        <AppText variant="sm" className="mt-2 leading-5 text-text-muted-v2">
          Track your progress, celebrate milestones, and stay motivated on your
          journey.
        </AppText>
      </View>
      <View
        className="h-32 w-32 items-center justify-center"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <View className="absolute bottom-0 h-16 w-32 rounded-t-full bg-primary-v2/10" />
        <View className="absolute h-24 w-24 rounded-full bg-primary-v2/15" />
        <View className="h-16 w-16 items-center justify-center rounded-full bg-primary-v2">
          <AppIcon icon={Trophy} size={32} className="text-on-primary-v2" />
          <View className="absolute top-3">
            <AppIcon
              icon={Star}
              size={10}
              strokeWidth={3}
              className="text-on-primary-v2"
            />
          </View>
        </View>
        <View className="absolute right-1 top-2">
          <AppIcon icon={Sparkles} size={20} className="text-link-v2" />
        </View>
      </View>
    </View>
  );
}

function SummaryCard({ unlocked, total }: { unlocked: number; total: number }) {
  const { color, track } = usePrimaryColor();
  const progress = total ? unlocked / total : 0;
  const percent = Math.round(progress * 100);

  return (
    <View className="mt-5 flex-row items-center overflow-hidden rounded-[24px] border border-primary-v2/30 bg-surface-v2 p-4">
      <AppCardDecoration />
      <View className="h-24 w-24 items-center justify-center">
        <Svg
          width={RING_SIZE}
          height={RING_SIZE}
          style={{ transform: [{ rotate: '-90deg' }] }}
        >
          <Circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            stroke={track}
            strokeWidth={RING_STROKE}
            fill="none"
          />
          <Circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            stroke={color}
            strokeWidth={RING_STROKE}
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
            fill="none"
          />
        </Svg>
        <AppText variant="lg" className="absolute font-bold text-text-v2">
          {unlocked} / {total}
        </AppText>
      </View>
      <View className="mx-4 h-16 w-px bg-border-v2" />
      <View className="flex-1">
        <AppText variant="lg" className="font-bold text-text-v2">
          {unlocked} of {total} Unlocked
        </AppText>
        <AppText variant="sm" className="mb-3 mt-1 text-text-muted-v2">
          {percent === 100
            ? 'You unlocked everything. Amazing!'
            : `You're ${percent}% of the way there! Keep going!`}
        </AppText>
        <View className="flex-row">
          <ProgressBar progress={progress} />
        </View>
      </View>
    </View>
  );
}

function Tabs({
  active,
  unlockedCount,
  lockedCount,
  onChange,
}: {
  active: Tab;
  unlockedCount: number;
  lockedCount: number;
  onChange: (tab: Tab) => void;
}) {
  const tabs = [
    {
      key: 'unlocked' as const,
      label: `Unlocked (${unlockedCount})`,
      icon: CircleCheck,
    },
    { key: 'locked' as const, label: `Locked (${lockedCount})`, icon: Lock },
  ];
  return (
    <View className="mt-5 flex-row rounded-full bg-primary-v2/10 p-1">
      {tabs.map(tab => {
        const isActive = tab.key === active;
        return (
          <AppPressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            className={`flex-1 flex-row items-center justify-center gap-2 rounded-full py-3 ${
              isActive ? 'bg-primary-v2' : ''
            }`}
          >
            <AppIcon
              icon={tab.icon}
              size={18}
              className={isActive ? 'text-on-primary-v2' : 'text-text-v2'}
            />
            <AppText
              variant="md"
              className={`font-semibold ${
                isActive ? 'text-on-primary-v2' : 'text-text-v2'
              }`}
            >
              {tab.label}
            </AppText>
          </AppPressable>
        );
      })}
    </View>
  );
}

function AchievementRow({
  achievement,
  index,
}: {
  achievement: Achievement;
  index: number;
}) {
  const Icon = getAchievementTypeIcon(achievement.type);
  const unlockedAgo =
    achievement.unlocked && achievement.unlockedAt
      ? formatDistanceToNowStrict(new Date(String(achievement.unlockedAt)), {
          addSuffix: true,
        })
      : null;

  return (
    <View
      className={`flex-row items-center overflow-hidden rounded-[20px] border bg-surface-v2 p-4 ${
        achievement.unlocked ? 'border-primary-v2/25' : 'border-border-v2'
      }`}
    >
      <AppPatternArtwork
        variant={
          APP_PATTERN_ARTWORK_VARIANTS[
            index % APP_PATTERN_ARTWORK_VARIANTS.length
          ]
        }
        className={achievement.unlocked ? 'w-2/5' : 'w-2/5 opacity-75'}
      />
      <View
        className={`h-14 w-14 items-center justify-center rounded-2xl ${
          achievement.unlocked ? 'bg-primary-v2/15' : 'bg-selected-v2'
        }`}
      >
        <AppIcon
          icon={Icon}
          size={24}
          strokeWidth={2}
          className={
            achievement.unlocked ? 'text-link-v2' : 'text-text-muted-v2'
          }
        />
      </View>
      <View className="mx-4 flex-1">
        <AppText variant="md" className="font-bold text-text-v2">
          {achievement.title}
        </AppText>
        {!!achievement.description && (
          <AppText variant="sm" className="mt-0.5 text-text-muted-v2">
            {achievement.description}
          </AppText>
        )}
        {achievement.unlocked ? (
          <View className="mt-1.5 flex-row items-center gap-1.5">
            <AppIcon icon={CalendarDays} size={13} className="text-link-v2" />
            <AppText variant="xs" className="font-semibold text-link-v2">
              {unlockedAgo ? `Unlocked ${unlockedAgo}` : 'Unlocked'}
            </AppText>
          </View>
        ) : (
          <AppText
            variant="xs"
            className="mt-1.5 font-semibold text-text-muted-v2"
          >
            Locked
          </AppText>
        )}
      </View>
      <View
        className={`h-10 w-10 items-center justify-center rounded-full ${
          achievement.unlocked ? 'bg-primary-v2/25' : 'bg-selected-v2'
        }`}
      >
        <AppIcon
          icon={achievement.unlocked ? Check : Lock}
          size={18}
          strokeWidth={2.5}
          className={
            achievement.unlocked ? 'text-link-v2' : 'text-text-muted-v2'
          }
        />
      </View>
    </View>
  );
}

function NextUpCard({ achievement }: { achievement: NextAchievement }) {
  const Icon = getAchievementTypeIcon(achievement.type);
  const progress = achievement.threshold
    ? achievement.progress / achievement.threshold
    : 0;

  return (
    <View className="mt-6">
      <View className="flex-row items-center gap-2">
        <AppIcon icon={Target} size={22} className="text-link-v2" />
        <AppText variant="xl" className="font-bold text-text-v2">
          Next Up
        </AppText>
      </View>
      <AppText variant="sm" className="mb-3 mt-1 text-text-muted-v2">
        Keep going to unlock this achievement.
      </AppText>
      <View className="flex-row items-center overflow-hidden rounded-[20px] border border-border-v2 bg-surface-v2 p-4">
        <AppPatternArtwork variant="stripes" className="w-2/5" />
        <View className="h-14 w-14 items-center justify-center rounded-2xl bg-selected-v2">
          <AppIcon icon={Icon} size={24} className="text-text-muted-v2" />
        </View>
        <View className="mx-4 flex-1">
          <AppText variant="md" className="font-bold text-text-v2">
            {achievement.title}
          </AppText>
          {!!achievement.description && (
            <AppText variant="sm" className="mt-0.5 text-text-muted-v2">
              {achievement.description}
            </AppText>
          )}
          <View className="mt-2.5 flex-row items-center gap-3">
            <ProgressBar progress={progress} />
            <AppText variant="xs" className="font-semibold text-text-muted-v2">
              {achievement.progress} / {achievement.threshold}
            </AppText>
          </View>
        </View>
        <View className="h-10 w-10 items-center justify-center rounded-full bg-selected-v2">
          <AppIcon icon={Lock} size={18} className="text-text-muted-v2" />
        </View>
      </View>
    </View>
  );
}

export function AchievementsScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('unlocked');
  const { data, isLoading } = useMyAchievementsQuery();
  const { data: nextData } = useNextAchievementQuery();
  const { color: loaderColor } = usePrimaryColor();

  const achievements = data?.myAchievements ?? [];
  const unlocked = achievements.filter(a => a.unlocked);
  const locked = achievements.filter(a => !a.unlocked);
  const visible = activeTab === 'unlocked' ? unlocked : locked;
  const nextAchievement = nextData?.nextAchievement;

  return (
    <AppAuthenticatedLayout
      noBottomPadding
      backgroundClassName="bg-background-v2"
    >
      <HeroHeader />
      <SummaryCard unlocked={unlocked.length} total={achievements.length} />
      <Tabs
        active={activeTab}
        unlockedCount={unlocked.length}
        lockedCount={locked.length}
        onChange={setActiveTab}
      />

      {isLoading && !achievements.length ? (
        <ActivityIndicator className="mt-10" color={loaderColor} />
      ) : (
        <View className="mt-4 gap-3">
          {visible.map((achievement, index) => (
            <AchievementRow
              index={index}
              key={`${activeTab}_${index}_${achievement.id ?? achievement.key}`}
              achievement={achievement}
            />
          ))}
          {!visible.length && (
            <AppText
              variant="md"
              className="mt-6 text-center text-text-muted-v2"
            >
              {activeTab === 'unlocked'
                ? 'No achievements unlocked yet. Your first one is close!'
                : 'You have unlocked every achievement!'}
            </AppText>
          )}
        </View>
      )}

      {nextAchievement && <NextUpCard achievement={nextAchievement} />}
      <View className="h-8" />
    </AppAuthenticatedLayout>
  );
}
