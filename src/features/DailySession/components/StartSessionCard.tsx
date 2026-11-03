import { ChevronRight, Play } from 'lucide-react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { AppButton } from '@/components';
import { DailySessionStackParamList } from '@/features/DailySession/navigation';

interface StartSessionCardProps {
  onRemindLater?: () => void;
}

export function StartSessionCard({}: StartSessionCardProps) {
  const navigation =
    useNavigation<NavigationProp<DailySessionStackParamList>>();

  return (
    <AppButton
      title="Continue Daily Session"
      size="lg"
      leftIcon={Play}
      fullWidth
      className="mb-0"
      onPress={() => navigation.navigate('DailySessionQuestionStep')}
      rightIcon={ChevronRight}
    />
  );

  //   return (
  //     <AppCard className="bg-background p-4 border border-border">
  //       {/* Start Session */}
  //       <AppButton
  //         title="Continue Daily Session"
  //         size="lg"
  //         leftIcon={Play}
  //         fullWidth
  //         className="mb-0"
  //         onPress={() => navigation.navigate('DailySessionQuestionStep')}
  //         rightIcon={ChevronRight}
  //       />

  //       {/* Remind Later */}
  //       <AppPressable
  //         onPress={onRemindLater}
  //         className="mt-2 flex-row items-center justify-center"
  //       >
  //         <AppIcon icon={Clock3} size={18} className="text-primary" />

  //         <AppText variant="md" className="ml-2 text-primary">
  //           Remind me later
  //         </AppText>
  //       </AppPressable>
  //     </AppCard>
  //   );
}
