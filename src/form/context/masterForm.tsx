import { FormProvider, useForm } from 'react-hook-form';
import {
  RecoveryFeeling,
  RecoveryGoal,
  RecoveryReason,
  RecoveryTimeline,
} from '@/__generated__/graphql';

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
      whatBringsYouHere: RecoveryReason.Breakup,
      howLongHasItBeen: RecoveryTimeline.Today,
      howAreYouFeeling: [
        RecoveryFeeling.Heartbroken,
        RecoveryFeeling.Lonely,
        RecoveryFeeling.Numb,
      ],
      whatWouldYouLikeHelpWith: [
        RecoveryGoal.Overthinking,
        RecoveryGoal.Sleep,
        RecoveryGoal.Heal,
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
