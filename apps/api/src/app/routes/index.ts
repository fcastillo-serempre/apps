import { Router } from 'express';

import { getEnvVariables } from '@apps/helpers';

import users from './users.routes';
import auth from './auth.routes';
import spaces from './spaces.routes';

const { baseURL } = getEnvVariables();

const routes = Router();

routes.use(`${baseURL}/user`, users);
routes.use(`${baseURL}/auth`, auth);
routes.use(`${baseURL}/spaces`, spaces);

export default routes;
