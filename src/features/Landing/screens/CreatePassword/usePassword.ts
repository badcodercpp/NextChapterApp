import { useState } from 'react';

export const PASSWORD_RULES = [
  {
    key: 'minLength',
    label: 'At least 8 characters long',
  },
  {
    key: 'uppercase',
    label: 'Include uppercase letter',
  },
  {
    key: 'lowercase',
    label: 'Include lowercase letter',
  },
  {
    key: 'number',
    label: 'Include at least one number',
  },
  {
    key: 'special',
    label: 'Include at least one special char',
  },
] as const;

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

export interface PasswordStrengthResult {
  strength: PasswordStrength;
  score: number;

  rules: {
    minLength: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export function getPasswordStrength(password: string): PasswordStrengthResult {
  const rules = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(rules).filter(Boolean).length;

  let strength: PasswordStrength = 'weak';

  if (score <= 1) {
    strength = 'weak';
  } else if (score <= 3) {
    strength = 'fair';
  } else if (score === 4) {
    strength = 'good';
  } else {
    strength = 'strong';
  }

  return {
    strength,
    score,
    rules,
  };
}

export const usePassword = () => {
  const [password, setPassword] = useState<string>('');

  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const calculatePasswordStrength = () => {
    return getPasswordStrength(password);
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    calculatePasswordStrength,
  };
};
