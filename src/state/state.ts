import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';

import { configureStore } from '@reduxjs/toolkit';
import { getCombinedSlices } from './slices';
import reactotron from '../../ReactotronConfig';

// enable this for data persist
// import { reduxStorage } from '../storage/appPersist';

const combinedSlices = getCombinedSlices();

// enable this for data persist
// const persistConfig = {
//   key: 'root',
//   storage: reduxStorage,
// };

// add this to reducer to start ppersisting redux store
// const persistedReducer = persistReducer(persistConfig, combinedSlices);

export const store = configureStore({
  reducer: combinedSlices,
  // enable this for data persist
  // reducer: persistedReducer,
  enhancers: getDefaultEnhancers =>
    __DEV__
      ? getDefaultEnhancers().concat(reactotron.createEnhancer!())
      : getDefaultEnhancers(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
