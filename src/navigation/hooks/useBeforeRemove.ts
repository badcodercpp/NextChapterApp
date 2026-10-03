import { NavigationAction, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

export const useBeforeRemove = () => {
  const navigation = useNavigation();
  const [pendingAction, setPendingAction] = useState<NavigationAction | null>(
    null,
  );

  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    return navigation.addListener('beforeRemove', e => {
      e.preventDefault();

      setPendingAction(e.data.action);
      setShowLeaveModal(true);
    });
  }, [navigation]);

  return {
    pendingAction,
    showLeaveModal,
    setPendingAction,
    setShowLeaveModal,
  };
};

/**
 * 
 * usase with AppConfirmModal
 * 
 * <AppConfirmModal
  visible={showLeaveModal}
  title="Leave Daily Session?"
  message="Are you sure you want to leave? Your current session progress may be lost."
  confirmText="Leave"
  cancelText="Stay"
  onCancel={() => {
    setShowLeaveModal(false);
    setPendingAction(null);
  }}
  onConfirm={() => {
    setShowLeaveModal(false);

    if (pendingAction) {
      navigation.dispatch(pendingAction);
      setPendingAction(null);
    }
  }}
/>
 */
