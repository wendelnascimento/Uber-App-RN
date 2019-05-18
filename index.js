import { AppRegistry } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import { registerScreens } from './screens';
import App from './App';

import store from './redux/configureStore';


Navigation.events().registerAppLaunchedListener(() => {
  registerScreens(store, Provider);

  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'uberApp.MapScreen',
            passProps: {}
          }
        }],
        options: {
          topBar: {
            title: {
              text: 'App Uber'
            }
          }
        }
      }
    }
  });
});

AppRegistry.registerComponent('App', () => App)

// Navigation.startSingleScreenApp({
//   screen: {
//     screen: 'uberApp.MapScreen', // unique ID registered with Navigation.registerScreen
//     title: 'App Uber', // title of the screen as appears in the nav bar (optional)
//     navigatorStyle: {
//       navBarHidden: true,
//     }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
//     navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
//   },
// });

