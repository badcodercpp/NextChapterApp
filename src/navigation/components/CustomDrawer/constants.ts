import {
  BookIcon,
  ChartBarIncreasing,
  HelpCircleIcon,
  HomeIcon,
  LogOutIcon,
  SettingsIcon,
  Share2,
  SparklesIcon,
  StarPlus,
  User,
  UserIcon,
} from 'lucide-react-native';

import { DrawerMenuItem } from './types';
import { DrawerRoutes } from '@/navigation/Drawer/DrawerRoutes';
import { TabRoutes } from '@/navigation/Tab/TabRoutes';

export const MAIN_MENU: DrawerMenuItem[] = [
  {
    id: 'home',
    title: 'Home',
    route: TabRoutes.Home,
    icon: HomeIcon,
  },
  {
    id: 'journal',
    title: 'Journal',
    route: TabRoutes.Journal,
    icon: BookIcon,
  },
  {
    id: 'ai',
    title: 'AI Companion',
    route: TabRoutes.AI,
    icon: SparklesIcon,
  },
  {
    id: 'progress',
    title: 'Progress',
    route: TabRoutes.Progress,
    icon: ChartBarIncreasing,
  },
  {
    id: 'profile',
    title: 'Profile',
    route: TabRoutes.Profile,
    icon: UserIcon,
  },
];

export const SETTINGS_MENU: DrawerMenuItem[] = [
  {
    id: 'profile',
    title: 'Profile',
    route: DrawerRoutes.Profile,
    icon: User,
  },
  {
    id: 'settings',
    title: 'Settings',
    route: DrawerRoutes.Settings,
    icon: SettingsIcon,
  },
  {
    id: 'rateus',
    title: 'Rate Us',
    route: DrawerRoutes.RateUs,
    icon: StarPlus,
  },
  {
    id: 'refertofriend',
    title: 'Refer to Friend',
    route: DrawerRoutes.ReferToFriend,
    icon: Share2,
  },
  {
    id: 'help',
    title: 'Help',
    route: DrawerRoutes.Help,
    icon: HelpCircleIcon,
  },
];

export const LOGOUT_ITEM: DrawerMenuItem = {
  id: 'logout',
  title: 'Logout',
  route: '',
  icon: LogOutIcon,
};
