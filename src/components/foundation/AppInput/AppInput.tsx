import { ActivityIndicator, TextInput, View } from 'react-native';
import type { AppInputProps, AppInputRef } from './types';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { AppIcon } from '../AppIcon';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import { Colors } from '@/theme/colors';
import { INPUT_ICON_SIZE } from './constants';
import { InputVariants } from './variants';
import { X } from 'lucide-react-native';
import { cn } from '@/utils/cn';

export const AppInput = forwardRef<AppInputRef, AppInputProps>(
  (
    {
      label,
      required,

      helperText,
      error,

      disabled = false,
      readOnly = false,

      loading = false,
      clearable = false,

      showCharacterCount = false,

      startIcon,
      endIcon,
      onEndIconPress,

      value,

      onFocus,
      onBlur,
      onChangeText,

      maxLength,

      multiline = false,

      className,
      inputClassName,
      labelClassName,
      helperTextClassName,

      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<TextInput>(null);

    const [focused, setFocused] = useState(false);

    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus();
      },

      blur() {
        inputRef.current?.blur();
      },

      clear() {
        inputRef.current?.clear();
        onChangeText?.('');
      },
    }));

    const handleFocus = useCallback(
      (e: any) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e: any) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    const handleClear = useCallback(() => {
      inputRef.current?.clear();
      onChangeText?.('');
    }, [onChangeText]);

    const isEditable = !disabled && !readOnly && disabled !== false;

    const showClearButton = clearable && !!value && !loading && isEditable;

    return (
      <View className={cn(className)}>
        {label && (
          <View className={cn(InputVariants.label.base)}>
            <AppText variant="lg" className={labelClassName}>
              {label}
            </AppText>

            {required && (
              <AppText variant="lg" color="error" className="ml-1">
                *
              </AppText>
            )}
          </View>
        )}

        <View
          className={cn(
            InputVariants.container.base,

            focused && InputVariants.container.focused,

            error && InputVariants.container.error,

            disabled && InputVariants.container.disabled,

            readOnly && InputVariants.container.readOnly,

            multiline && 'items-start',
          )}
        >
          {startIcon && (
            <View className={InputVariants.icon.left}>
              <AppIcon icon={startIcon} size={INPUT_ICON_SIZE} />
            </View>
          )}

          <TextInput
            ref={inputRef}
            {...props}
            value={value}
            editable={isEditable}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'center'}
            maxLength={maxLength}
            placeholderTextColorClassName={cn('accent-text-secondary')}
            className={cn(
              InputVariants.input.base,

              multiline && InputVariants.input.multiline,

              disabled && InputVariants.input.disabled,

              inputClassName,
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={onChangeText}
          />

          {loading ? (
            <View className={InputVariants.icon.right}>
              <ActivityIndicator color={Colors.primary} />
            </View>
          ) : showClearButton ? (
            <AppPressable
              className={InputVariants.icon.right}
              onPress={handleClear}
              accessibilityRole="button"
              accessibilityLabel="Clear text"
            >
              <AppIcon icon={X} size={18} />
            </AppPressable>
          ) : endIcon ? (
            onEndIconPress ? (
              <AppPressable
                className={InputVariants.icon.right}
                onPress={onEndIconPress}
              >
                <AppIcon icon={endIcon} size={INPUT_ICON_SIZE} />
              </AppPressable>
            ) : (
              <View className={InputVariants.icon.right}>
                <AppIcon icon={endIcon} size={INPUT_ICON_SIZE} />
              </View>
            )
          ) : null}
        </View>

        {(helperText || error || (showCharacterCount && maxLength)) && (
          <View className={InputVariants.helper.container}>
            <AppText
              variant="lg"
              color={error ? 'error' : 'textSecondary'}
              className={helperTextClassName}
            >
              {error || helperText}
            </AppText>

            {showCharacterCount && maxLength && (
              <AppText variant="lg" color="textSecondary">
                {`${value?.length ?? 0}/${maxLength}`}
              </AppText>
            )}
          </View>
        )}
      </View>
    );
  },
);

AppInput.displayName = 'AppInput';
