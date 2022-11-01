import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { theme } from './theme.default';
import { Theme } from './theme.interface';

export const THEME_FEATURE_KEY = '@theme';

export interface ThemeState {
  theme: Theme;
}

export const themeAdapter = createEntityAdapter<ThemeState>();

export const initialThemeState: ThemeState =
  themeAdapter.getInitialState<ThemeState>({
    theme,
  });

export const themeSlice = createSlice({
  name: THEME_FEATURE_KEY,
  initialState: initialThemeState,
  reducers: {
    setTheme: (state, { payload: theme }: PayloadAction<Theme>) => {
      state.theme = theme;
    },
  },
});

export const themeActions = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
