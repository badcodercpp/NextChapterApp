// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */
//@ts-ignore
import './src/global.css';

import { MasterFormProvider } from '@/form';
import { Provider } from 'react-redux';
import RootNavigator from './src/navigation/RootStack/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { ToastProvider } from '@/components';
import { Uniwind } from 'uniwind';
import { initializeReduxGraphqlNativeConfig } from 'redux-graphql-native';
import { store } from '@/state';
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

  useEffect(() => {
    initializeReduxGraphqlNativeConfig({
      REDUX_GRAPGQL_NATIVE_ENDPOINT:
        process.env.REDUX_GRAPGQL_NATIVE_ENDPOINT ||
        'http://192.168.31.125:3000',
      REDUX_GRAPGQL_NATIVE_WS_ENDPOINT:
        process.env.REDUX_GRAPGQL_NATIVE_WS_ENDPOINT ||
        'ws://192.168.31.125:3000',
      REDUX_GRAPGQL_NATIVE_API_PREFIX:
        process.env.REDUX_GRAPGQL_NATIVE_API_PREFIX || 'graphql',
    });
  }, []);

  return (
    <Provider store={store}>
      {/** enable this for persist */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <MasterFormProvider>
          <RootNavigator />
        </MasterFormProvider>
        <ToastProvider />
      </SafeAreaProvider>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
