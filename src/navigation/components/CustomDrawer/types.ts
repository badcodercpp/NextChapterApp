import { ComponentType } from 'react';

export interface DrawerMenuItem {
  id: string;
  title: string;
  route: string;
  icon: ComponentType<any>;
}

export interface DrawerItemProps {
  item: DrawerMenuItem;
  focused: boolean;
  onPress: () => void;
}
