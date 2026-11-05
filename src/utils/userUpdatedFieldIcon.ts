import {
  CalendarDays,
  Clock,
  FileText,
  Image,
  Languages,
  MapPin,
  MapPinned,
  Phone,
  User,
  UserRoundPen,
} from 'lucide-react-native';

import type { LucideIcon } from 'lucide-react-native';
import { UserUpdatedField } from '@/__generated__/graphql';

const userUpdatedFieldIcons: Record<UserUpdatedField, LucideIcon> = {
  [UserUpdatedField.DisplayName]: UserRoundPen,
  [UserUpdatedField.AvatarUrl]: Image,
  [UserUpdatedField.Bio]: FileText,
  [UserUpdatedField.Phone]: Phone,
  [UserUpdatedField.Dob]: CalendarDays,
  [UserUpdatedField.LocationName]: MapPin,
  [UserUpdatedField.LocationLat]: MapPinned,
  [UserUpdatedField.LocationLong]: MapPinned,
  [UserUpdatedField.Gender]: User,
  [UserUpdatedField.Timezone]: Clock,
  [UserUpdatedField.Locale]: Languages,
};

export function getUserUpdatedFieldIcon(field: UserUpdatedField): LucideIcon {
  return userUpdatedFieldIcons[field];
}
