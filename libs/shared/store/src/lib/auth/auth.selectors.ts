import { RootState } from '../root';
import { AUTH_FEATURE_KEY } from './auth.slice';

export const selectAuthStatus = (state: RootState) =>
  state[AUTH_FEATURE_KEY].status;

export const selectAuthUser = (state: RootState) =>
  state[AUTH_FEATURE_KEY].user;

export const selectAuthErrorMessage = (state: RootState) =>
  state[AUTH_FEATURE_KEY].errorMessage;
