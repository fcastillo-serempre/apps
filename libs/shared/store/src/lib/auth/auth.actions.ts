import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import type { UserEntity } from '@apps/models';
import { wikiApi } from '@apps/services';

import { RootState } from '../root/root.reducer';
import { handleToken } from '../helpers';

export interface PayloadLogin extends Pick<UserEntity, 'email'> {
  password: string;
}

export const login = createAsyncThunk<
  UserEntity, // Return type of the payload creator
  PayloadLogin, // First argument to the payload creator
  { state: RootState }
>(`@auth/login`, async (user: PayloadLogin): Promise<UserEntity> => {
  try {
    const { data } = await wikiApi('/auth', {
      method: 'POST',
      data: user,
    });

    const {
      user: { id, name, email },
      token,
    } = data;

    // Save token in localStorage
    const { saveToken } = handleToken();
    saveToken(token);

    const userEntity: UserEntity = {
      id,
      name,
      email,
    };

    return userEntity;
  } catch (error) {
    if (error instanceof AxiosError || error instanceof Error || error) {
      return Promise.reject(error);
    }
    return Promise.reject('Unknown error');
  }
});

export const logout = createAsyncThunk<
  void, // Return type of the payload creator
  void, // First argument to the payload creator
  { state: RootState }
>(`@auth/logout`, async (): Promise<void> => {
  // Remove token from localStorage
  const { removeToken } = handleToken();
  removeToken();
});

export const checkToken = createAsyncThunk<
  UserEntity,
  void,
  { state: RootState }
>(`@auth/checkToken`, async (): Promise<UserEntity> => {
  const { getToken, saveToken } = handleToken();
  const token = getToken();

  if (!token) return Promise.reject('Token not found');

  try {
    const {
      data: { token, user },
    } = await wikiApi.get('/auth/renew');

    // Save token in localStorage
    saveToken(token);

    const { id, name } = user;

    const userEntity: UserEntity = {
      id,
      name,
    };

    return userEntity;
  } catch (error) {
    if (error instanceof AxiosError || error instanceof Error || error) {
      return Promise.reject(error);
    }
    return Promise.reject('Unknown error');
  }
});
