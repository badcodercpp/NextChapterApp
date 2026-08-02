import { AppEmptyStateProps } from './types';
import { AppText } from '../AppText';
import React from 'react';
import { View } from 'react-native';
import { cn } from '@/utils/cn';

export function AppEmptyState({
  title,
  description,
  illustration,
  footer,
  className,
  titleClassName,
  descriptionClassName,
  ...props
}: AppEmptyStateProps) {
  return (
    <View
      {...props}
      className={cn('items-center justify-center px-8 py-10', className)}
    >
      {illustration && <View className="mb-6">{illustration}</View>}

      <AppText variant="xs" className={cn('text-center', titleClassName)}>
        {title}
      </AppText>

      {description && (
        <AppText
          variant="xs"
          color="textSecondary"
          className={cn('mt-2 text-center', descriptionClassName)}
        >
          {description}
        </AppText>
      )}

      {footer && <View className="mt-8">{footer}</View>}
    </View>
  );
}
