import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { gapi } from 'gapi-script';

import type { UserEntity } from '@apps/models';
import { wikiApi } from '@apps/services';
import { handleToken } from '@apps/helpers';

import { RootState } from '../root/root.reducer';

export interface PayloadLogin extends Pick<UserEntity, 'email'> {
  password: string;
}

const normalizeUser = (user: UserEntity): UserEntity => {
  const { id, name, email, photoURL } = user;
  return { id, name, email, photoURL };
};

export const asyncLogin = createAsyncThunk<
  UserEntity, // Return type of the payload creator
  PayloadLogin, // First argument to the payload creator
  { state: RootState }
>(`@auth/login`, async (user: PayloadLogin): Promise<UserEntity> => {
  try {
    const { data } = await wikiApi.post(`/auth/login`, user);

    const { user: userData, token } = data;

    // Save token in localStorage
    handleToken().set(token);

    return normalizeUser(userData);
  } catch (error) {
    if (error instanceof AxiosError || error instanceof Error || error) {
      return Promise.reject(error);
    }
    return Promise.reject('Unknown error');
  }
});

export const asyncLogout = createAsyncThunk<
  void, // Return type of the payload creator
  void, // First argument to the payload creator
  { state: RootState } // Types for ThunkAPI
>(`@auth/logout`, async (): Promise<void> => {
  const auth2 = gapi.auth2.getAuthInstance();

  if (auth2 != null) {
    await auth2.signOut();
  }

  handleToken().remove();
});

export const asyncCheckToken = createAsyncThunk<
  UserEntity,
  void,
  { state: RootState }
>(`@auth/checkToken`, async (): Promise<UserEntity> => {
  const { get: getToken, set: setToken } = handleToken();
  const token = getToken();

  if (!token) return Promise.reject('Token not found');

  try {
    const {
      data: { token, user },
    } = await wikiApi.get('/auth/renew');

    // Save token in localStorage
    setToken(token);

    return normalizeUser(user);
  } catch (error) {
    if (error instanceof AxiosError || error instanceof Error || error) {
      return Promise.reject(error);
    }
    return Promise.reject('Unknown error');
  }
});

export const asyncLoginWithGoogle = createAsyncThunk<
  UserEntity,
  string,
  { state: RootState }
>(`@auth/loginWithGoogle`, async (tokenId: string): Promise<UserEntity> => {
  try {
    const {
      data: { token, user },
    } = await wikiApi.post('/auth/google', {
      tokenId,
    });

    // Save token in localStorage
    handleToken().set(token);

    return normalizeUser(user);
  } catch (error) {
    if (error instanceof AxiosError || error instanceof Error || error) {
      return Promise.reject(error);
    }
    return Promise.reject('Unknown error');
  }
});
