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
import { X } from 'lucide-react-native';
import { styles } from './styles';

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
      editable,

      containerStyle,
      inputContainerStyle,
      inputStyle,
      labelStyle,
      helperTextStyle,

      onFocus,
      onBlur,
      onChangeText,

      maxLength,

      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<TextInput>(null);

    const [focused, setFocused] = useState(false);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),

      blur: () => inputRef.current?.blur(),

      clear: () => {
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

    const isEditable = !disabled && !readOnly && editable !== false;

    const showClearButton = clearable && !!value && !loading && isEditable;

    return (
      <View style={containerStyle}>
        {label && (
          <View style={styles.labelContainer}>
            <AppText variant="label" style={labelStyle}>
              {label}
            </AppText>

            {required && (
              <AppText variant="label" color="error" style={styles.required}>
                *
              </AppText>
            )}
          </View>
        )}

        <View
          style={[
            styles.inputContainer,

            focused && styles.focused,

            !!error && styles.error,

            disabled && styles.disabled,

            readOnly && styles.readOnly,

            inputContainerStyle,
          ]}
        >
          {startIcon && (
            <View style={styles.startIcon}>
              <AppIcon
                icon={startIcon}
                size={INPUT_ICON_SIZE}
                color="textSecondary"
              />
            </View>
          )}

          <TextInput
            ref={inputRef}
            {...props}
            value={value}
            editable={isEditable}
            style={[styles.input, inputStyle]}
            placeholderTextColor={Colors.textTertiary}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={onChangeText}
          />

          {loading ? (
            <View style={styles.endIcon}>
              <ActivityIndicator color={Colors.primary} />
            </View>
          ) : showClearButton ? (
            <AppPressable
              style={styles.endIcon}
              onPress={handleClear}
              accessibilityRole="button"
              accessibilityLabel="Clear text"
            >
              <AppIcon icon={X} size={18} color="textSecondary" />
            </AppPressable>
          ) : endIcon ? (
            onEndIconPress ? (
              <AppPressable style={styles.endIcon} onPress={onEndIconPress}>
                <AppIcon
                  icon={endIcon}
                  size={INPUT_ICON_SIZE}
                  color="textSecondary"
                />
              </AppPressable>
            ) : (
              <View style={styles.endIcon}>
                <AppIcon
                  icon={endIcon}
                  size={INPUT_ICON_SIZE}
                  color="textSecondary"
                />
              </View>
            )
          ) : null}
        </View>

        {(helperText || error || showCharacterCount) && (
          <View style={styles.helperContainer}>
            <AppText
              variant="caption"
              color={error ? 'error' : 'textSecondary'}
              style={helperTextStyle}
            >
              {error || helperText}
            </AppText>

            {showCharacterCount && maxLength && (
              <AppText
                variant="caption"
                color="textSecondary"
                style={styles.counter}
              >
                {`${value?.length ?? 0}/${maxLength}`}
              </AppText>
            )}
          </View>
        )}
      </View>
    );
  },
);
