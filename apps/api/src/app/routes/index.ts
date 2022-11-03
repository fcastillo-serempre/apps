import { Router } from 'express';

import { getEnvVariables } from '@apps/helpers';

import users from './users.routes';
import auth from './auth.routes';
import spaces from './spaces.routes';
import categories from './categories.routes';

const { baseURL } = getEnvVariables();

const routes = Router();

const paths = {
  users: `${baseURL}/users`,
  auth: `${baseURL}/auth`,
  spaces: `${baseURL}/spaces`,
  categories: `${baseURL}/categories`,
};

routes.use(paths.users, users);
routes.use(paths.auth, auth);
routes.use(paths.spaces, spaces);
routes.use(paths.categories, categories);

export default routes;
