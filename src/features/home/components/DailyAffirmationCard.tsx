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
      <AppCard className="rounded-[28px] border border-rose-v2/30 bg-surface-v2 px-5 py-4">
        <View className="flex-row items-center">
          {/* Icon */}
          <View className="mr-4">
            <AppIcon
              icon={Sparkles}
              size={28}
              className="text-rose-v2"
              strokeWidth={2}
            />
          </View>

          {/* Content */}
          <View className="flex-1">
            <AppText
              variant="md"
              className="font-semibold text-text-v2"
              numberOfLines={2}
            >
              {t(motivationalMessage?.title ?? title) ?? title}
            </AppText>

            {subtitle && (
              <AppText
                variant="sm"
                className="mt-1 text-text-muted-v2"
                numberOfLines={1}
              >
                {t(motivationalMessage?.description ?? subtitle) ?? subtitle}
              </AppText>
            )}
          </View>

          <AppIcon
            icon={ChevronRight}
            size={20}
            className="ml-3 text-text-muted-v2"
          />
        </View>
      </AppCard>
    </AppPressable>
  );
}
