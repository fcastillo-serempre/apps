import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';

import { createRouteReducer, RootState } from './root.reducer';
// import { AUTH_FEATURE_KEY } from '../auth/auth.slice';

const isDevelopment = process.env['NODE_ENV'] === 'development';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  // blacklist: [AUTH_FEATURE_KEY],
};

const persistedReducer = persistReducer(persistConfig, createRouteReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    return isDevelopment ? defaultMiddleware.concat(logger) : defaultMiddleware;
  },
  devTools: isDevelopment,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
