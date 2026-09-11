import { ComponentType } from 'react';

export interface AppIconProps {
  icon: ComponentType<any>;
  size?: number;
  strokeWidth?: number;
  className?: string;
  count?: number; // Added count prop
  maxCount?: number; // Optional limit (e.g., 99+)
}
