/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { StatusBar, useColorScheme } from 'react-native';

// import RootNavigator from './src/navigation/RootStack/RootNavigator';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <RootNavigator />
//     </SafeAreaProvider>
//   );
// }

// export default App;

import { Text, View } from 'react-native';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 items-center justify-center bg-red-500">
        <Text className="text-3xl font-bold text-white">
          NativeWind Working
        </Text>
      </View>
    </SafeAreaProvider>
  );
}
