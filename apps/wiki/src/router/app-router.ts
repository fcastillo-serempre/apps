import { FC, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import { useAuthStore } from '@apps/store';

import { routes as globalRoutes } from './root.routes';

export const AppRouter: FC = () => {
  const { status, handleCheckToken } = useAuthStore();

  useEffect(() => {
    handleCheckToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routes = useRoutes(globalRoutes(status));

  return routes;
};
