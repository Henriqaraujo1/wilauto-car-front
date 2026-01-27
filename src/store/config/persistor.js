import persistStore from 'redux-persist/es/persistStore';
import store from './store';

export const persistor = persistStore(store);