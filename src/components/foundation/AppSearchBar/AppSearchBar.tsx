import type { AppInputRef, AppSearchBarProps } from './types';
import { Filter, Search } from 'lucide-react-native';
import React, { forwardRef } from 'react';

import { AppInput } from '../AppInput';

export const AppSearchBar = forwardRef<AppInputRef, AppSearchBarProps>(
  (
    {
      showFilter = false,
      onFilterPress,

      placeholder = 'Search...',

      clearable = true,

      endIcon,

      inputClassName,

      className,

      ...props
    },
    ref,
  ) => {
    return (
      <AppInput
        ref={ref}
        {...props}
        className={className}
        inputClassName={inputClassName}
        placeholder={placeholder}
        clearable={clearable}
        startIcon={Search}
        endIcon={showFilter ? endIcon ?? Filter : endIcon}
        onEndIconPress={showFilter ? onFilterPress : props.onEndIconPress}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
      />
    );
  },
);

AppSearchBar.displayName = 'AppSearchBar';
