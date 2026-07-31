import { ComponentType } from 'react';
import { SvgProps } from 'react-native-svg';

export interface DrawerMenuItem {
  id: string;
  title: string;
  route: string;
  icon: ComponentType<SvgProps>;
}

export interface DrawerItemProps {
  item: DrawerMenuItem;
  focused: boolean;
  onPress: () => void;
}
