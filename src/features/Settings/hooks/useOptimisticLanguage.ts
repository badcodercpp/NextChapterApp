import { useCallback, useOptimistic, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/state';
import { TLanguageCode } from '@/translation/types';
import { availableLanguages } from '@/translation/config';
import i18n from '@/translation/i18n';
import { selectCurrentLanguage } from '@/state/selectors/local/preferences';
import { setLanguagePreference } from '@/state/slices/local/preferences';

export const useOptimisticLanguage = () => {
  const [isPending, startTransition] = useTransition();

  const dispatch = useDispatch<AppDispatch>();
  const language = useSelector(selectCurrentLanguage);

  const [optimisticLanguage, addOptimisticLanguage] = useOptimistic<
    TLanguageCode,
    TLanguageCode
  >(language, (_currentLanguage, newLanguage: TLanguageCode) => newLanguage);

  const selectedLanguage =
    availableLanguages.find(item => item.code === optimisticLanguage)?.label ??
    'English';

  const changeAppLanguage = useCallback(
    (newLanguage: TLanguageCode) => {
      startTransition(async () => {
        addOptimisticLanguage(newLanguage);
        dispatch(setLanguagePreference(newLanguage));
        await i18n.changeLanguage(newLanguage);
      });
    },
    [addOptimisticLanguage, dispatch],
  );

  return { optimisticLanguage, changeAppLanguage, isPending, selectedLanguage };
};
