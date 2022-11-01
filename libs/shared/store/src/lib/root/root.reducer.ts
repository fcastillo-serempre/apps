import {
  AnyAction,
  combineReducers,
  Reducer,
  ThunkAction,
} from '@reduxjs/toolkit';

import { authReducer, AUTH_FEATURE_KEY } from '../auth/auth.slice';

// import { spacesReducer, SPACES_FEATURE_KEY } from '../spaces/spaces.slice';
// import { THEME_FEATURE_KEY, themeReducer } from '../theme/theme.slice';

const reducers = {
  [AUTH_FEATURE_KEY]: authReducer,
  // [THEME_FEATURE_KEY]: themeReducer,
  // [SPACES_FEATURE_KEY]: spacesReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const createRouteReducer: Reducer<RootState> = (state, action) => {
  return combinedReducer(state, action);
};

export type RootState = ReturnType<typeof combinedReducer>;

export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
