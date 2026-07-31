import { AppInput, AppInputRef } from '../AppInput';
import { Filter, Search } from 'lucide-react-native';
import React, { forwardRef } from 'react';

import { AppSearchBarProps } from './types';

export const AppSearchBar = forwardRef<AppInputRef, AppSearchBarProps>(
  (
    {
      showFilter = false,
      onFilterPress,

      placeholder = 'Search...',

      clearable = true,

      endIcon,

      ...props
    },
    ref,
  ) => {
    return (
      <AppInput
        ref={ref}
        {...props}
        placeholder={placeholder}
        clearable={clearable}
        startIcon={Search} // replace with your icon
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
