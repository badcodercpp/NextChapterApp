import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { AppIcon } from '@/components/foundation/AppIcon';
import { AppText } from '@/components/foundation/AppText';
import { LucideIcon } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { styles } from './styles';

interface Props {
  focused: boolean;
  icon: LucideIcon;
  label: string;
  onPress: () => void;
}

export function TabButton({ focused, icon, label, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, focused && styles.activeButton]}
    >
      <AppIcon icon={icon} size={24} />

      {focused && (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <AppText className="pl-2 text-text">{label}</AppText>
        </Animated.View>
      )}
    </Pressable>
  );
}
