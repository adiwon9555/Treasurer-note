import {applyMiddleware, compose, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['MemberReducer'],
  blacklist: [],
};
let composeEnhancers = compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = compose(composeEnhancers(applyMiddleware(ReduxThunk)))(
  createStore,
)(persistedReducer);

export default () => {
  let persistor = persistStore(store);
  return {store, persistor};
};
