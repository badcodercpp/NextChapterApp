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
import { cn } from '@/utils';

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
      containerClassName,
      startIconClassName,
      endIconClassName,
      startIconSize,
      endIconSize,

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

    const isEditable = !disabled && !readOnly;

    const showClearButton = clearable && !!value && !loading && isEditable;

    /**
     * Multiline:
     *
     * Container
     * ┌─────────────────────────────┐
     * │ icon  Text starts here   icon│
     * │       second line            │
     * │       third line             │
     * └─────────────────────────────┘
     *
     * Icons must stay at the top instead
     * of being vertically centered.
     */

    const leftIconClassName = cn(
      InputVariants.icon.left,
      multiline && 'self-start pt-4',
    );

    const rightIconClassName = cn(
      InputVariants.icon.right,
      multiline && 'self-start pt-4',
    );

    return (
      <View className={cn(className)}>
        {/* Label */}
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

        {/* Input Container */}
        <View
          className={cn(
            InputVariants.container.base,

            focused && InputVariants.container.focused,

            error && InputVariants.container.error,

            disabled && InputVariants.container.disabled,

            readOnly && InputVariants.container.readOnly,

            multiline && 'items-start',

            containerClassName ?? '',
          )}
        >
          {/* Left Icon */}
          {startIcon && (
            <View className={leftIconClassName}>
              <AppIcon
                icon={startIcon}
                size={startIconSize ?? INPUT_ICON_SIZE}
                className={startIconClassName}
              />
            </View>
          )}

          {/* Text Input */}
          <TextInput
            ref={inputRef}
            {...props}
            value={value}
            editable={isEditable}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : undefined}
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

          {/* Right Side */}
          {loading ? (
            <View className={rightIconClassName}>
              <ActivityIndicator color={Colors.primary} />
            </View>
          ) : showClearButton ? (
            <AppPressable
              className={rightIconClassName}
              onPress={handleClear}
              accessibilityRole="button"
              accessibilityLabel="Clear text"
            >
              <AppIcon icon={X} size={18} />
            </AppPressable>
          ) : endIcon ? (
            onEndIconPress ? (
              <AppPressable
                className={rightIconClassName}
                onPress={onEndIconPress}
              >
                <AppIcon
                  icon={endIcon}
                  size={endIconSize ?? INPUT_ICON_SIZE}
                  className={endIconClassName}
                />
              </AppPressable>
            ) : (
              <View className={rightIconClassName}>
                <AppIcon
                  icon={endIcon}
                  size={endIconSize ?? INPUT_ICON_SIZE}
                  className={endIconClassName}
                />
              </View>
            )
          ) : null}
        </View>

        {/* Helper / Error / Character Count */}
        {(helperText || error || (showCharacterCount && maxLength)) && (
          <View className={InputVariants.helper.container}>
            <AppText
              variant="md"
              className={cn(
                helperTextClassName,
                error ? 'text-error' : 'text-secondary',
              )}
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
