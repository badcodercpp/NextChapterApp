import {
  AppButton,
  AppCard,
  AppIcon,
  AppPressable,
  AppText,
} from '@/components';
import { ChevronRight, Clock3, Play } from 'lucide-react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { DailySessionStackParamList } from '@/features/DailySession/navigation';

interface StartSessionCardProps {
  onRemindLater?: () => void;
}

export function StartSessionCard({ onRemindLater }: StartSessionCardProps) {
  const navigation =
    useNavigation<NavigationProp<DailySessionStackParamList>>();

  return (
    <AppCard className="bg-transparent p-0">
      {/* Start Session */}
      <AppButton
        title="Continue Daily Session"
        size="lg"
        leftIcon={Play}
        fullWidth
        className="mb-0"
        onPress={() => navigation.navigate('DailySessionQuestionStep')}
        rightIcon={ChevronRight}
      />

      {/* Remind Later */}
      <AppPressable
        onPress={onRemindLater}
        className="mt-2 flex-row items-center justify-center"
      >
        <AppIcon icon={Clock3} size={18} className="text-primary" />

        <AppText variant="md" className="ml-2 text-primary">
          Remind me later
        </AppText>
      </AppPressable>
    </AppCard>
  );
}
