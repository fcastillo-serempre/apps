import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';

import { getEnvVariables } from '@apps/helpers';

import auth from './app/routes/auth.routes';
import space from './app/routes/space.routes';

import { dbConnection } from './app';

const { port, baseURL } = getEnvVariables();

const CLIENT_BUILD_PATH = path.join(__dirname, '../wiki');

// Database
dbConnection();

// Express server
const app: express.Application = express();

// Public directory
app.use(express.static(CLIENT_BUILD_PATH));

// Read and parse body
app.use(express.json());

// API routes
app.options('*', cors());

app.use(`${baseURL}/auth`, auth);
app.use(`${baseURL}/spaces`, space);

app.get('*', (_, response: express.Response) => {
  response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + baseURL);
});
server.on('error', console.error);
