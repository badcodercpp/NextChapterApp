import { FormProvider, useForm } from 'react-hook-form';
import {
  RecoveryReason,
  RecoveryReasonCurrentFeeling,
  RecoveryReasonEndGoal,
  RecoveryReasonTimeline,
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
      howLongHasItBeen: RecoveryReasonTimeline.Today,
      howAreYouFeeling: [
        RecoveryReasonCurrentFeeling.Heartbroken,
        RecoveryReasonCurrentFeeling.Lonely,
        RecoveryReasonCurrentFeeling.Numb,
      ],
      whatWouldYouLikeHelpWith: [
        RecoveryReasonEndGoal.Overthinking,
        RecoveryReasonEndGoal.Sleep,
        RecoveryReasonEndGoal.Heal,
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
