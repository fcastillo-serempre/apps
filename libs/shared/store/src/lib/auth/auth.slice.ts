import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';

import type { UserEntity } from '@apps/models';

import type { AuthState } from './auth.types';
import { checkToken, login, logout } from './auth.actions';

export const AUTH_FEATURE_KEY = '@auth';

export const authAdapter = createEntityAdapter<AuthState>();

const initialAuthState: AuthState = authAdapter.getInitialState<AuthState>({
  status: 'checking',
});

type ActionError = {
  error: SerializedError;
};

export const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState: initialAuthState,
  reducers: {
    checkingCredentials: (state) => {
      state.errorMessage = undefined;
      state.status = 'checking';
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      authSlice.caseReducers.checkingCredentials(state);
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<UserEntity>) => {
        state.errorMessage = undefined;
        state.status = 'authenticated';
        state.user = action.payload;
      }
    );
    builder.addCase(login.rejected, (state, { error }: ActionError) => {
      state.errorMessage = error.message;
      state.status = 'not-authenticated';
      state.user = undefined;
    });
    // Logout
    builder.addCase(logout.pending, (state) => {
      authSlice.caseReducers.checkingCredentials(state);
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.errorMessage = undefined;
      state.status = 'not-authenticated';
      state.user = undefined;
    });
    // Check token
    builder.addCase(checkToken.pending, (state) => {
      authSlice.caseReducers.checkingCredentials(state);
    });
    builder.addCase(
      checkToken.fulfilled,
      (state, action: PayloadAction<UserEntity>) => {
        state.errorMessage = undefined;
        state.status = 'authenticated';
        state.user = action.payload;
      }
    );
    builder.addCase(checkToken.rejected, (state, { error }: ActionError) => {
      state.errorMessage = error.message;
      state.status = 'not-authenticated';
      state.user = undefined;
    });
  },
});

export const authReducer = authSlice.reducer;
