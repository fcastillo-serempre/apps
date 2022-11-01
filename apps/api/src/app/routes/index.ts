import { Router } from 'express';

import { getEnvVariables } from '@apps/helpers';

import auth from './auth.routes';
import space from './space.routes';

const { baseURL } = getEnvVariables();

const routes = Router();

routes.use(`${baseURL}/auth`, auth);
routes.use(`${baseURL}/spaces`, space);

export default routes;
