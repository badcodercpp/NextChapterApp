import { AppButton } from '@/components/foundation/AppButton';
import { AppCard } from '@/components/foundation/AppCard';
import { AppIcon } from '@/components/foundation/AppIcon';
import { AppText } from '@/components/foundation/AppText';
import { ArrowRight } from 'lucide-react-native';
import { DEFAULT_ICON } from './constants';
import { QuestionCardProps } from './types';
import React from 'react';
import { styles } from './styles';

export function QuestionCard({
  title,
  question,
  helperText,
  buttonTitle,
  icon = DEFAULT_ICON,
  loading = false,
  onPress,
  style,
}: QuestionCardProps) {
  return (
    <AppCard style={style} padding="2xl" shadow="md">
      <AppIcon icon={icon} color="primary" size={32} />

      <AppText variant="caption" color="textSecondary" style={styles.title}>
        {title}
      </AppText>

      <AppText variant="h3" style={styles.question}>
        {question}
      </AppText>

      {helperText && (
        <AppText
          variant="bodySmall"
          color="textSecondary"
          style={styles.helperText}
        >
          {helperText}
        </AppText>
      )}

      <AppButton
        title={buttonTitle}
        loading={loading}
        rightIcon={ArrowRight}
        onPress={onPress}
      />
    </AppCard>
  );
}
