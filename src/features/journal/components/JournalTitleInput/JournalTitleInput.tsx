import { AppInput } from '@/components/foundation/AppInput';
import { AppText } from '@/components/foundation/AppText';
import { JournalTextFieldProps } from './types';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export const JournalTextField = ({
  value,
  onChangeText,
  error,
  maxLength,
  style,
  ...inputProps
}: JournalTextFieldProps) => {
  return (
    <View style={style}>
      <AppInput
        value={value}
        onChangeText={onChangeText}
        error={error}
        maxLength={maxLength}
        {...inputProps}
        inputStyle={styles.multiline}
      />

      {maxLength && (
        <AppText variant="bodySmall" style={styles.counter}>
          {value.length}/{maxLength}
        </AppText>
      )}
    </View>
  );
};
