import { Compass, Smile, Sprout, Target } from 'lucide-react-native';
import { useCallback, useEffect } from 'react';

import { MasterFormData } from '@/form/types';
import { ReflectionData } from '@/features/DailySession/types/types';
import { selectCurrentSessionReflection } from '@/state/selectors';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

export const useDailySessionReflectionMetadata = () => {
  const { data: currentSessionReflection } = useSelector(
    selectCurrentSessionReflection,
  );

  const { setValues } = useFormContext<MasterFormData>();

  const getReflectionPrompts = useCallback(() => {
    const prompts: {
      key: keyof ReflectionData;
      title: string;
      description: string;
      icon: typeof Smile;
    }[] = [
      {
        key: 'realization',
        title: 'What did you learn about yourself today?',
        description: 'Your thoughts, feelings, or patterns.',
        icon: Smile,
      },
      {
        key: 'feeling',
        title: 'What felt meaningful or helpful?',
        description: 'Moments, insights, or realizations.',
        icon: Sprout,
      },
      {
        key: 'need',
        title: 'What was challenging for you?',
        description: 'Anything that was hard to face or accept.',
        icon: Compass,
      },
      {
        key: 'action',
        title: 'What will you carry forward?',
        description: 'One intention or reminder for tomorrow.',
        icon: Target,
      },
    ];

    return prompts;
  }, []);

  useEffect(() => {
    setValues({
      sessionReflection: {
        realization: currentSessionReflection?.realization ?? '',
        feeling: currentSessionReflection?.feeling ?? '',
        need: currentSessionReflection?.need ?? '',
        action: currentSessionReflection?.action ?? '',
        userMessage: '',
      },
    });
  }, [currentSessionReflection, setValues]);

  return {
    getReflectionPrompts,
  };
};
