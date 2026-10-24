import { Modal, Pressable, View } from 'react-native';
import React, { ReactNode, useState } from 'react';

interface AppPopoverProps {
  children: ReactNode;
  content: ReactNode;
  width?: number;
}

export function AppPopover({
  children,
  content,
  width = 160,
}: AppPopoverProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => {
          console.log('POPOVER PRESSED');
          setVisible(true);
        }}
      >
        {children}
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View className="flex-1">
          {/* Backdrop */}
          <Pressable
            className="absolute inset-0"
            onPress={() => setVisible(false)}
          />

          {/* Menu */}
          <View
            className="absolute right-6 top-20 overflow-hidden rounded-2xl border border-border bg-card"
            style={{ width }}
          >
            {content}
          </View>
        </View>
      </Modal>
    </>
  );
}
