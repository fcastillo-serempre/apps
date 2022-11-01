import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import { getEnvVariables } from '@apps/helpers';

const { baseURL } = getEnvVariables();

export const wikiApi: AxiosInstance = axios.create({
  baseURL,
});

wikiApi.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {};

    // config.headers = {
    //   ...config.headers,
    //   'x-token': localStorage.getItem('token') || '',
    // };

    config.headers['x-token'] = localStorage.getItem('token');

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// export default wikiApi;
