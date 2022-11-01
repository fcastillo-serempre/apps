import { RootState } from '../root/root.reducer';
import { THEME_FEATURE_KEY } from './theme.slice';

export const selectTheme = (state: RootState) => state[THEME_FEATURE_KEY].theme;

export const selectThemeAvatar = (state: RootState) =>
  state[THEME_FEATURE_KEY].theme.avatar;

export const selectThemeButton = (state: RootState) =>
  state[THEME_FEATURE_KEY].theme.button;

export const selectThemeTextField = (state: RootState) =>
  state[THEME_FEATURE_KEY].theme.textField;

export const selectThemeTypography = (state: RootState) =>
  state[THEME_FEATURE_KEY].theme.typography;
