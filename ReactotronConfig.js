import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.configure({
  host: '192.168.194.51',
}) // controls connection & communication settings
  .use(reactotronRedux())
  .useReactNative({
    networking: true,
  }) // add all built-in react native plugins
  .connect(); // let's connect!

console.tron = Reactotron;

export default reactotron;
