import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import type { UserEntity } from '@apps/models';
import { wikiApi } from '@apps/services';
import { handleToken } from '@apps/helpers';

import { RootState } from '../root/root.reducer';

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

    const { user: userData, token } = data;

    const { id, name, email } = userData;

    // Save token in localStorage
    handleToken().set(token);

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
  handleToken().remove();
});

export const checkToken = createAsyncThunk<
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

    const { id, name, email } = user;

    // Save token in localStorage
    setToken(token);

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
