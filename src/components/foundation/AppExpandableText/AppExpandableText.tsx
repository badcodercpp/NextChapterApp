import React, { useState } from 'react';
import { TextLayoutEvent, View } from 'react-native';

import { AppExpandableTextProps } from './types';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';

export function AppExpandableText({
  text,
  variant = 'md',
  collapsedLines = 1,
  showMoreText = 'show more',
  showLessText = 'show less',
  textClassName = 'text-text',
  buttonClassName = 'mt-2',
  buttonTextClassName = 'text-primary',
}: AppExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);

  const handleTextLayout = (event: TextLayoutEvent) => {
    if (expanded) {
      return;
    }

    const lines = event.nativeEvent.lines ?? [];

    setIsExpandable(lines.length > collapsedLines);
  };

  if (!text) {
    return null;
  }

  return (
    <View>
      {/* Hidden full-text measurement */}
      {!expanded && (
        <View
          className="absolute left-0 right-0 opacity-0"
          pointerEvents="none"
        >
          <AppText
            variant="md"
            className={textClassName}
            onTextLayout={handleTextLayout}
          >
            {text}
          </AppText>
        </View>
      )}
      <AppText
        variant={variant}
        numberOfLines={expanded ? undefined : collapsedLines}
        className={textClassName}
      >
        {text}
      </AppText>

      {isExpandable && (
        <AppPressable
          onPress={() => setExpanded(value => !value)}
          className={buttonClassName}
        >
          <AppText variant="md" className={buttonTextClassName}>
            {expanded ? showLessText : showMoreText}
          </AppText>
        </AppPressable>
      )}
    </View>
  );
}
