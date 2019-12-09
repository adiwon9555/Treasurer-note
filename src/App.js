import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';
import Routes from './routes';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './configureStore'

const { store, persistor } = configureStore();
export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}><Text>Loading...</Text></View>} persistor={persistor}>
                    <Routes>

                    </Routes>
                </PersistGate>
            </Provider>

        );
    }
}