// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */
//@ts-ignore
import './src/global.css';

import { StatusBar, View } from 'react-native';
import { persistor, store } from '@/state';

import { AppPrefrencesProvider } from '@/prefrences';
import { MasterFormProvider } from '@/form';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import RootNavigator from './src/navigation/RootStack/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from '@/components';
import { Uniwind } from 'uniwind';
import { useGoogleAuthConfiguration } from '@/hooks/useGoogleAuthConfiguration';

// Use dark during startup; AppThemeProvider restores the user's saved choice.
Uniwind.setTheme('dark');

function App() {
  useGoogleAuthConfiguration();
  return (
    <Provider store={store}>
      {/** enable this for persist */}
      <PersistGate
        loading={
          <View className="flex-1 bg-background">
            <StatusBar barStyle="light-content" />
          </View>
        }
        persistor={persistor}
      >
        <AppPrefrencesProvider>
          <SafeAreaProvider>
            <MasterFormProvider>
              <RootNavigator />
            </MasterFormProvider>
            <ToastProvider />
          </SafeAreaProvider>
        </AppPrefrencesProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
