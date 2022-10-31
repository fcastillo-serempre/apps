import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';

import auth from './app/routes/auth.routes';

import { config, dbConnection } from './app';

const CLIENT_BUILD_PATH = path.join(__dirname, '../wiki');
const API_ROOT = '/api/v1';

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

app.use(`${API_ROOT}/auth`, auth);

app.get('*', (_, response: express.Response) => {
  response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

const port = config.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + API_ROOT);
});
server.on('error', console.error);
