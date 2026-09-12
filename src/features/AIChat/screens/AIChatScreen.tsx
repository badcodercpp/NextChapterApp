import {
  AICoachCard,
  ChatComposer,
  ChatDateDivider,
  ChatMessage,
  QuickReplies,
} from '@/features/AIChat/components';
import { FlatList, View } from 'react-native';

import { AppAuthenticatedLayout } from '@/components';
import { AppText } from '@/components/foundation/AppText';
import { MESSAGES_MOCK } from '@/features/AIChat/mocks/msg';
import React from 'react';

export function AIChatScreen() {
  return (
    <AppAuthenticatedLayout noBottomPadding withoutScrollView>
      <AppText variant="xl">AIChatScreen</AppText>

      <View className="mt-4 flex-1">
        <FlatList
          data={MESSAGES_MOCK}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-0"
          ListHeaderComponent={
            <View>
              <AICoachCard />
              <ChatDateDivider />
            </View>
          }
          renderItem={({ item }) => <ChatMessage message={item} />}
          ListFooterComponent={
            <View>
              <View className="mt-4">
                <QuickReplies />
              </View>
            </View>
          }
        />
        <View className="mt-2">
          <QuickReplies />
        </View>
        <View className="mt-2">
          <ChatComposer />
        </View>
      </View>
    </AppAuthenticatedLayout>
  );
}
