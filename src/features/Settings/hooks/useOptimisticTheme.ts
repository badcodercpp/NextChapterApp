import { APP_SUPPORTED_THEMES, AppTheme } from '@/features/Settings/constants';
import { useCallback, useOptimistic, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/state';
import { selectCurrentTheme } from '@/state/selectors/local/preferences';
import { setThemePreference } from '@/state/slices/local/preferences';

export const useOptimisticTheme = () => {
  const [isPending, startTransition] = useTransition();

  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector(selectCurrentTheme);

  const [optimisticTheme, addOptimisticTheme] = useOptimistic(
    theme,
    (_currentTheme, newTheme: AppTheme) => newTheme,
  );

  const selectedTheme =
    APP_SUPPORTED_THEMES.find(item => item.value === optimisticTheme)?.label ??
    'System default';

  const changeAppTheme = useCallback(
    (newTheme: AppTheme) => {
      startTransition(() => {
        addOptimisticTheme(newTheme);
        dispatch(setThemePreference(newTheme));
      });
    },
    [addOptimisticTheme, dispatch],
  );

  return { optimisticTheme, changeAppTheme, isPending, selectedTheme };
};
