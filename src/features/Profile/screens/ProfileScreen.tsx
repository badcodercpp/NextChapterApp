import { AppAuthenticatedLayout } from '@/components';
import { AppText } from '@/components/foundation/AppText';
import React from 'react';

export function ProfileScreen() {
  return (
    <AppAuthenticatedLayout noBottomPadding withoutScrollView>
      <AppText variant="xl">ProfileScreen</AppText>
    </AppAuthenticatedLayout>
  );
}
