import { ArrowRight, Clock3 } from 'lucide-react-native';

import { AppButton } from '@/components/foundation/AppButton';
import { AppText } from '@/components/foundation/AppText';
import { OpenBookIllustration } from '../../../../../assets/illustrations';
import React from 'react';
import { ReflectionCardBackground } from './ReflectionCardBackground';
import { ReflectionQuestion } from '../types';
import { View } from 'react-native';
import { styles } from '../styles';

interface Props {
  question: ReflectionQuestion;
  onAnswerPress?: () => void;
}

export function ReflectionCard({ question, onAnswerPress }: Props) {
  return (
    <View style={styles.card}>
      <ReflectionCardBackground />

      <View style={styles.content}>
        {/* LEFT */}
        <View style={styles.left}>
          <View style={styles.titleRow}>
            <AppText variant="bodySmall" color="primary">
              {question.title}
            </AppText>
          </View>

          <AppText variant="titleMediumBold" style={styles.question}>
            {question.question}
          </AppText>

          <AppText
            variant="caption"
            color="textSecondary"
            style={styles.questionDesc}
          >
            {question.description}
          </AppText>

          <View style={styles.bottomRow}>
            <AppButton
              title="Answer Question"
              onPress={onAnswerPress}
              size="sm"
              variant="primary"
              rightIcon={ArrowRight}
              fullWidth={false}
            />

            <AppButton
              title={question.duration}
              onPress={onAnswerPress}
              size="sm"
              variant="secondary"
              leftIcon={Clock3}
              fullWidth={false}
              style={styles.chip}
            />
          </View>
        </View>

        {/* RIGHT */}
        <OpenBookIllustration width={120} height={120} />
      </View>
    </View>
  );
}
