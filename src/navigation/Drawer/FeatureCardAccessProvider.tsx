import React, { useCallback, useMemo } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useLazyMyAccessQuery } from '@/__generated__/graphql';
import { CardAccessContext } from '@/components/foundation/AppCard/CardAccess';
import { selectIsFreeTrialExpiredUser } from '@/state/selectors';
import { DrawerParamList } from './DrawerParamList';
import { DrawerRoutes } from './DrawerRoutes';

export function FeatureCardAccessProvider({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: Pick<DrawerNavigationProp<DrawerParamList>, 'navigate'>;
}) {
  const locked = useSelector(selectIsFreeTrialExpiredUser);
  const [refreshAccess] = useLazyMyAccessQuery();
  const openPremium = useCallback(
    () => navigation.navigate(DrawerRoutes.Premium),
    [navigation],
  );
  const value = useMemo(() => ({ locked, openPremium }), [locked, openPremium]);

  useFocusEffect(
    useCallback(() => {
      refreshAccess()
        .unwrap()
        .catch(error => console.error('Unable to refresh access:', error));
    }, [refreshAccess]),
  );

  return (
    <CardAccessContext.Provider value={value}>
      {children}
    </CardAccessContext.Provider>
  );
}
