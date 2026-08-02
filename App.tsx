/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

//@ts-ignore
import './src/global.css';

import { StatusBar, useColorScheme } from 'react-native';

import RootNavigator from './src/navigation/RootStack/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';
import { useEffect } from 'react';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    Uniwind.setTheme('ocean');
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
