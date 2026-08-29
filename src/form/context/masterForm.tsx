import {
  FeelingEnum,
  GoalEnum,
  RecoveryReasonEnum,
  TimelineEnum,
} from '@/features/Landing/enums';
import { FormProvider, useForm } from 'react-hook-form';

import { MasterFormData } from '@/form/types';
import React from 'react';
import { masterSchema } from '@/form/schema';
import { zodResolver } from '@hookform/resolvers/zod';

// Entire app Form
export function MasterFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm<MasterFormData>({
    resolver: zodResolver(masterSchema),
    mode: 'onTouched',
    defaultValues: {
      whatBringsYouHere: RecoveryReasonEnum.Breakup,
      howLongHasItBeen: TimelineEnum.Today,
      howAreYouFeeling: [
        FeelingEnum.Heartbroken,
        FeelingEnum.Lonely,
        FeelingEnum.Numb,
      ],
      whatWouldYouLikeHelpWith: [
        GoalEnum.Overthinking,
        GoalEnum.Sleep,
        GoalEnum.Heal,
      ],
      verifyEmail: {
        otp: ['', '', '', ''],
      },
      verifyIdentity: {
        otp: ['', '', '', ''],
      },
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
