import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import { DrawerActions } from '@react-navigation/native';
import { DrawerFooter } from './DrawerFooter';
import { DrawerHeader } from './DrawerHeader';
import { DrawerItem } from './DrawerItem';
import React from 'react';
import { SETTINGS_MENU } from './constants';
import { View } from 'react-native';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CustomDrawerComponent({
  navigation,
  state,
}: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets();

  const currentRoute = state.routeNames[state.index];

  const navigate = (route: string) => {
    navigation.navigate(route as never);

    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollContent}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.container}>
        <DrawerHeader />

        <View style={styles.menu}>
          {SETTINGS_MENU.map(item => (
            <DrawerItem
              key={item.id}
              item={item}
              focused={currentRoute === item.route}
              onPress={() => navigate(item.route)}
            />
          ))}
        </View>

        <DrawerFooter
          onLogout={() => {
            // TODO:
            // logout user
            // clear storage
            // navigate auth
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export const CustomDrawer = (props: DrawerContentComponentProps) => (
  <CustomDrawerComponent {...props} />
);
