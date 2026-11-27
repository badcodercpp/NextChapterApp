import { AppIcon } from '../AppIcon';
import { Crown } from 'lucide-react-native';
import { View } from 'react-native';
import { selectIsPremiumUser } from '@/state/selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export function PremiumAvatarBadge() {
  const isPremium = useSelector(selectIsPremiumUser);
  const { t } = useTranslation();

  if (!isPremium) {
    return null;
  }

  return (
    <View
      accessible
      accessibilityLabel={t('app.locale.premium.badge')}
      pointerEvents="none"
      className="absolute -bottom-1 -right-1 h-7 w-7 items-center justify-center rounded-full border-2 border-surface-v2 bg-primary-v2"
    >
      <AppIcon icon={Crown} size={14} className="text-on-primary-v2" />
    </View>
  );
}
