import { FlatList, View } from 'react-native';
import {
  MentorChatComposer,
  MentorChatMessage,
} from '@/features/mentors/components';

import { AppAuthenticatedLayout } from '@/components';
import { AppText } from '@/components/foundation/AppText';
import { MESSAGES_MOCK } from '@/features/AIChat/mocks/msg';
import React from 'react';

export function MentorChatScreen() {
  return (
    <AppAuthenticatedLayout noBottomPadding withoutScrollView>
      <AppText variant="xl">MentorChatScreen</AppText>

      <View className="mt-4 flex-1">
        <FlatList
          data={MESSAGES_MOCK}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-0"
          renderItem={({ item }) => <MentorChatMessage message={item} />}
        />
        <View className="mt-2">
          <MentorChatComposer />
        </View>
      </View>
    </AppAuthenticatedLayout>
  );
}
