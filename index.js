/**
 * @format
 */

// app locale support
import './src/translation/i18n';

import App from './App';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
