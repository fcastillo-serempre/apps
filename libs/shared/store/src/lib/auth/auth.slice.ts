import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';

import type { UserEntity } from '@apps/models';

import type { AuthState } from './auth.types';
import {
  asyncCheckToken,
  asyncLogin,
  asyncLoginWithGoogle,
  asyncLogout,
} from './auth.actions';

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
    login: (state, action: PayloadAction<UserEntity>) => {
      state.errorMessage = undefined;
      state.status = 'authenticated';
      state.user = action.payload;
    },
    logout: (state) => {
      state.errorMessage = undefined;
      state.status = 'not-authenticated';
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(asyncLogin.pending, (state) => {
      authSlice.caseReducers.checkingCredentials(state);
    });
    builder.addCase(
      asyncLogin.fulfilled,
      (state, action: PayloadAction<UserEntity>) => {
        authSlice.caseReducers.login(state, action);
      }
    );
    builder.addCase(asyncLogin.rejected, (state, { error }: ActionError) => {
      state.errorMessage = error.message;
      state.status = 'not-authenticated';
      state.user = undefined;
    });
    // Logout
    builder.addCase(asyncLogout.pending, (state) => {
      authSlice.caseReducers.checkingCredentials(state);
    });
    builder.addCase(asyncLogout.fulfilled, (state) => {
      authSlice.caseReducers.logout(state);
    });
    // Login with Google
    builder.addCase(asyncLoginWithGoogle.pending, (state) => {
      authSlice.caseReducers.checkingCredentials(state);
    });
    builder.addCase(
      asyncLoginWithGoogle.fulfilled,
      (state, action: PayloadAction<UserEntity>) => {
        authSlice.caseReducers.login(state, action);
      }
    );
    // Check token
    builder.addCase(asyncCheckToken.pending, (state) => {
      authSlice.caseReducers.checkingCredentials(state);
    });
    builder.addCase(
      asyncCheckToken.fulfilled,
      (state, { payload: user }: PayloadAction<UserEntity>) => {
        state.errorMessage = undefined;
        state.status = 'authenticated';
        state.user = user;
      }
    );
    builder.addCase(
      asyncCheckToken.rejected,
      (state, { error }: ActionError) => {
        state.errorMessage = error.message;
        state.status = 'not-authenticated';
        state.user = undefined;
      }
    );
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
