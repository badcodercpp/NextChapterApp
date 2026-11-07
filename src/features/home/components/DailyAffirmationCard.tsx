import { AppCard, AppIcon, AppPressable, AppText } from '@/components';

import { ChevronRight, Sparkles } from 'lucide-react-native';
import { View } from 'react-native';
import { selectMotivationalMessage } from '@/state/selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface DailyAffirmationCardProps {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
}

export function DailyAffirmationCard({ onPress }: DailyAffirmationCardProps) {
  const { t } = useTranslation();
  const { data: motivationalMessage } = useSelector(selectMotivationalMessage);

  const title = t('app.locale.home.dailyAffirmationCard.title');
  const subtitle = t('app.locale.home.dailyAffirmationCard.description');

  return (
    <AppPressable onPress={onPress}>
      <AppCard className="overflow-hidden rounded-[24px] border border-primary-v2/25 bg-background-v2 px-4 py-4">
        <View
          pointerEvents="none"
          className="absolute -bottom-16 -right-12 h-28 w-48 rounded-full bg-primary-v2/10"
        />
        <View className="flex-row items-start">
          {/* Icon */}
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-[14px] border border-primary-v2/25 bg-primary-v2/15">
            <AppIcon
              icon={Sparkles}
              size={20}
              className="text-link-v2"
              strokeWidth={2}
            />
          </View>

          {/* Content */}
          <View className="flex-1 border-l border-primary-v2/25 pl-3">
            <AppText
              variant="md"
              className="font-semibold leading-6 text-text-v2"
            >
              {t(motivationalMessage?.title ?? title) ?? title}
            </AppText>

            {subtitle && (
              <AppText
                variant="sm"
                className="mt-1 leading-5 text-text-muted-v2"
              >
                {t(motivationalMessage?.description ?? subtitle) ?? subtitle}
              </AppText>
            )}
          </View>

          {onPress && (
            <AppIcon
              icon={ChevronRight}
              size={20}
              className="ml-3 text-text-muted-v2"
            />
          )}
        </View>
      </AppCard>
    </AppPressable>
  );
}
