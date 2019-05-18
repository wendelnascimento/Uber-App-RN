import * as React from 'react';

import { Navigation } from 'react-native-navigation';

import MapScreen from './MapScreen/MapScreen';
import SearchScreen from './SearchScreen/SearchScreen';
import ProductsScreen from './ProductsScreen/ProductsScreen';
import RideScreen from './RideScreen/RideScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('uberApp.MapScreen', () => (props) => (
    <Provider store={store}>
      <MapScreen {...props} />
    </Provider>
  ), () => MapScreen);
  Navigation.registerComponent('uberApp.SearchScreen', () => (props) => (
    <Provider store={store}>
      <SearchScreen {...props} />
    </Provider>
  ), () => SearchScreen);
  Navigation.registerComponent('uberApp.ProductsScreen', () => (props) => (
    <Provider store={store}>
      <ProductsScreen {...props} />
    </Provider>
  ), () => ProductsScreen);
  Navigation.registerComponent('uberApp.RideScreen', () => (props) => (
    <Provider store={store}>
      <RideScreen {...props} />
    </Provider>
  ), () => RideScreen);
}
