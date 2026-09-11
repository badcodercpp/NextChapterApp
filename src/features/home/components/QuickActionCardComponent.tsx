import { BookOpen, Bot } from 'lucide-react-native';
import { LayoutChangeEvent, View } from 'react-native';

import { QuickActionCard } from './QuickActionCard';
import { useState } from 'react';

interface QuickActionCardComponentProps {}

export function QuickActionCardComponent({}: QuickActionCardComponentProps) {
  const [cardHeight, setCardHeight] = useState(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setCardHeight(prev => Math.max(prev, height));
  };

  return (
    <View className="flex-row flex-wrap justify-between">
      <QuickActionCard
        icon={BookOpen}
        title="Journal Prompt"
        description="What's one feeling you're ready to release today?"
        actionLabel="Start Journaling"
        accentClassName="text-primary"
        iconBackgroundClassName="bg-primary/15"
        onPress={() => {
          // navigate to journal
        }}
        onLayout={handleLayout}
        style={cardHeight ? { height: cardHeight } : undefined}
      />

      <QuickActionCard
        icon={Bot}
        title="AI Coach"
        description="I'm here for you. Let's talk if you need support."
        actionLabel="Chat Now"
        accentClassName="text-secondary"
        iconBackgroundClassName="bg-secondary/15"
        onPress={() => {
          // navigate to AI coach
        }}
        onLayout={handleLayout}
        style={cardHeight ? { height: cardHeight } : undefined}
      />
    </View>
  );
}
