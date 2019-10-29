import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers'
import Routes from './routes';

export default class App extends Component {
    render() {
        // const store = createStore(rootReducer)
        return (
            // <Provider store={store}>
                <Routes>

                </Routes>
            // </Provider>

        );
    }
}