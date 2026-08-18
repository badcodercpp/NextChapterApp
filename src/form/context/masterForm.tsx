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
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
