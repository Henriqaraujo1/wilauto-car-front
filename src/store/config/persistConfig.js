import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],           // o que você quer persistir
  blacklist: ['clientApi'],      // NÃO persiste o cache da api do RTK Query
};

export default persistConfig;
