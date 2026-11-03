// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */
//@ts-ignore
import './src/global.css';

import { persistor, store } from '@/state';

import { MasterFormProvider } from '@/form';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import RootNavigator from './src/navigation/RootStack/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from '@/components';
import { AppThemeProvider } from '@/theme/AppThemeProvider';
import { useGoogleAuthConfiguration } from '@/hooks/useGoogleAuthConfiguration';
import { Uniwind } from 'uniwind';
import { StatusBar, View } from 'react-native';

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
        <AppThemeProvider>
          <SafeAreaProvider>
            <MasterFormProvider>
              <RootNavigator />
            </MasterFormProvider>
            <ToastProvider />
          </SafeAreaProvider>
        </AppThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
