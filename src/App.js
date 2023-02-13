import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {View, Text, Image, StyleSheet} from 'react-native';
import Routes from './navigations/routes';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './configureStore';
import {enableScreens} from 'react-native-screens';

const {store, persistor} = configureStore();
export default class App extends Component {
  constructor() {
    super();
    enableScreens(true);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={
            <View style={styles.splashLoaderContainer}>
              <Image
                resizeMode={'contain'}
                style={styles.imageStyle}
                source={require('./assets/images/uesi-logo-transparent.png')}
              />
            </View>
          }
          persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  splashLoaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  imageStyle: {width: 200},
});
