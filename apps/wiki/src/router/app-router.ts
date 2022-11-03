import { FC, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import { useAuthStore } from '@apps/store';

import { routes as globalRoutes } from './root.routes';
import { getEnvVariables } from '@apps/helpers';
import { gapi, loadAuth2 } from 'gapi-script';

export const AppRouter: FC = () => {
  const { status, handleCheckToken } = useAuthStore();
  const { googleClientId } = getEnvVariables();

  useEffect(() => {
    handleCheckToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const setAuth2 = async () => {
      await loadAuth2(gapi, googleClientId, 'profile email');
    };

    setAuth2();
  }, [googleClientId]);

  const routes = useRoutes(globalRoutes(status));

  return routes;
};
