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
import { StatusBar } from 'react-native';
import { ToastProvider } from '@/components';
import { Uniwind } from 'uniwind';
import { useEffect } from 'react';
import { useGoogleAuthConfiguration } from '@/hooks/useGoogleAuthConfiguration';

function App() {
  useGoogleAuthConfiguration();
  const isDarkMode =
    Uniwind.currentTheme === 'dark' || Uniwind.currentTheme === 'ocean';

  console.log('Uniwind.currentTheme', Uniwind.currentTheme, isDarkMode);

  useEffect(() => {
    Uniwind.setTheme('ocean');
  }, []);

  return (
    <Provider store={store}>
      {/** enable this for persist */}
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <MasterFormProvider>
            <RootNavigator />
          </MasterFormProvider>
          <ToastProvider />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
