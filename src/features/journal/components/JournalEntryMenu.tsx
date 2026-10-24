import { AppIcon, AppPressable, AppText } from '@/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import React, { useState } from 'react';

import { AppDispatch } from '@/state';
import { JournalStackParamList } from '@/features/journal/navigation/JournalStackParamList';
import { MoreVertical } from 'lucide-react-native';
import { Placement } from 'react-native-popover-view/dist/Types';
import Popover from 'react-native-popover-view';
import { RecentJournalEntriesQuery } from '@/__generated__/graphql';
import { cn } from '@/utils';
import { setEditJournalTarget } from '@/state/slices/local/editJournalTarget';
import { useDeleteJournalBootstrap } from '../hooks/useDeleteJournalBootstrap';
import { useDispatch } from 'react-redux';

type JournalEntry = RecentJournalEntriesQuery['recentJournalEntries'][0];

interface JournalEntryMenuProps {
  entry: JournalEntry;
}

export function JournalEntryMenu({ entry }: JournalEntryMenuProps) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<JournalStackParamList>>();

  const { deleteJournal } = useDeleteJournalBootstrap();

  const handleEdit = () => {
    setVisible(false);
    dispatch(setEditJournalTarget(entry));
    navigation.navigate('EditJournal');
  };

  const handleDelete = () => {
    setVisible(false);
    deleteJournal(entry.id);
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    // delete logic
  };

  return (
    <Popover
      isVisible={visible}
      onRequestClose={() => setVisible(false)}
      placement={Placement.AUTO}
      // eslint-disable-next-line react-native/no-inline-styles
      backgroundStyle={{ backgroundColor: 'transparent' }}
      // eslint-disable-next-line react-native/no-inline-styles
      popoverStyle={{
        borderRadius: 16,
        overflow: 'hidden',
      }}
      from={
        <Pressable onPress={() => setVisible(true)}>
          <AppIcon
            icon={MoreVertical}
            size={23}
            strokeWidth={3}
            className="text-primary"
          />
        </Pressable>
      }
    >
      <View className="w-40 bg-transparent border-1 border-border rounded-xl">
        <AppPressable onPress={handleEdit} className="px-4 py-2">
          <AppText className="text-primary">Edit</AppText>
        </AppPressable>

        <View className={cn('h-0.5 flex-1 rounded-full', 'bg-border')} />

        <AppPressable onPress={handleDelete} className="px-4 py-2">
          <AppText className="text-error">Delete</AppText>
        </AppPressable>
      </View>
    </Popover>
  );
}
