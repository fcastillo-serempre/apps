import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import { AuthStatus } from '@apps/store';

import { AppRoutesEnum } from './app-routes.enum';

import { Login } from '../app/login';
import { GoogleSignIn } from '../app/google-sign-in';
import { Logout } from '../app/logout';

export const routes: (status: AuthStatus) => RouteObject[] = (status) => {
  const isAuthenticated = status === 'authenticated';

  const { login, signup } = AppRoutesEnum;

  return [
    !isAuthenticated
      ? {
          path: '/',
          element: (
            <div className="flex flex-col items-center p-4">
              <Outlet />
            </div>
          ),
          children: [
            {
              index: true,
              element: <Navigate to="/login/google" />,
            },
            {
              path: login,
              element: (
                <div>
                  <h1>Login</h1>
                </div>
              ),
            },
            {
              path: `${login}/email`,
              element: <Login />,
            },
            {
              path: `${login}/google`,
              element: <GoogleSignIn />,
            },
            {
              path: signup,
              element: (
                <div>
                  <h1>Join</h1>
                </div>
              ),
            },
          ],
        }
      : {
          path: '/',
          element: (
            <div className="flex flex-col items-center p-4">
              <Outlet />
            </div>
          ),
          children: [
            {
              index: true,
              element: <Logout />,
            },
          ],
        },
    {
      path: '/*',
      element: <Navigate to="/" />,
    },
  ];
};
