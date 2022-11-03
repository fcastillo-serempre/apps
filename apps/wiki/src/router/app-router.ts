import { FC, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import { useAuthStore } from '@apps/store';

import { routes as globalRoutes } from './root.routes';
import { getEnvVariables } from '@apps/helpers';
import { gapi } from 'gapi-script';

export const AppRouter: FC = () => {
  const { status, handleCheckToken } = useAuthStore();
  const { googleClientId } = getEnvVariables();

  useEffect(() => {
    handleCheckToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: googleClientId,
        scope: 'profile email',
      });
    };
    gapi.load('client:auth2', initClient);
  }, [googleClientId]);

  const routes = useRoutes(globalRoutes(status));

  return routes;
};
