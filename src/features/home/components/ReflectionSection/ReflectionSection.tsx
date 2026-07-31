import React from 'react';
import { ReflectionCard } from './components/ReflectionCard';
import { View } from 'react-native';
import { reflectionQuestion } from './mock';
import { styles } from './styles';

interface Props {
  onAnswerPress?: () => void;
}

export function ReflectionSection({ onAnswerPress }: Props) {
  return (
    <View style={styles.container}>
      <ReflectionCard
        question={reflectionQuestion}
        onAnswerPress={onAnswerPress}
      />
    </View>
  );
}
