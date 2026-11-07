import { AppIcon, AppPressable, AppText } from '@/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import React, { useState } from 'react';

import { AppDispatch } from '@/state';
import { JournalRoutes } from '@/features/journal/navigation';
import { JournalStackParamList } from '@/features/journal/navigation/JournalStackParamList';
import { MoreVertical, PencilLine, Trash2 } from 'lucide-react-native';
import { Placement } from 'react-native-popover-view/dist/Types';
import Popover from 'react-native-popover-view';
import { RecentJournalEntriesQuery } from '@/__generated__/graphql';
import { useResolveClassNames } from 'uniwind';
import { setEditJournalTarget } from '@/state/slices/local/editJournalTarget';
import { useDeleteJournalBootstrap } from '../hooks/useDeleteJournalBootstrap';
import { useDispatch } from 'react-redux';

type JournalEntry = RecentJournalEntriesQuery['recentJournalEntries'][0];

interface JournalEntryMenuProps {
  entry: JournalEntry;
  origin: keyof typeof JournalRoutes;
}

export function JournalEntryMenu({ entry, origin }: JournalEntryMenuProps) {
  const [visible, setVisible] = useState(false);
  const { backgroundColor } = useResolveClassNames('bg-background-v2');
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
    navigation.navigate(origin);

    // delete logic
  };

  return (
    <Popover
      isVisible={visible}
      onRequestClose={() => setVisible(false)}
      placement={[Placement.BOTTOM, Placement.TOP]}
      offset={8}
      arrowSize={{ width: 0, height: 0 }}
      // eslint-disable-next-line react-native/no-inline-styles
      backgroundStyle={{ backgroundColor: 'transparent' }}
      // eslint-disable-next-line react-native/no-inline-styles
      popoverStyle={{
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor,
      }}
      from={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Actions for ${entry.title}`}
          onPress={() => setVisible(true)}
          className="h-9 w-9 items-center justify-center rounded-xl border border-primary-v2/20 bg-primary-v2/10"
        >
          <AppIcon
            icon={MoreVertical}
            size={23}
            strokeWidth={3}
            className="text-link-v2"
          />
        </Pressable>
      }
    >
      <View className="w-44 overflow-hidden rounded-2xl border border-primary-v2/30 bg-background-v2 p-2">
        <AppPressable
          accessibilityRole="button"
          onPress={handleEdit}
          className="flex-row items-center rounded-xl bg-primary-v2/15 px-3 py-3"
        >
          <AppIcon icon={PencilLine} size={22} className="mr-3 text-link-v2" />
          <AppText variant="md" className="font-semibold text-text-v2">
            Edit
          </AppText>
        </AppPressable>
        <AppPressable
          accessibilityRole="button"
          onPress={handleDelete}
          className="mt-1 flex-row items-center rounded-xl px-3 py-3"
        >
          <AppIcon icon={Trash2} size={22} className="mr-3 text-error" />
          <AppText variant="md" className="font-semibold text-error">
            Delete
          </AppText>
        </AppPressable>
      </View>
    </Popover>
  );
}
