import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
// import helmet from 'helmet';

import { getEnvVariables } from '@apps/helpers';

import routes from './app/routes';
import { dbConnection } from './app';

const { port, baseURL } = getEnvVariables();

const CLIENT_BUILD_PATH = path.join(__dirname, '../wiki');

dbConnection(); // Database

const app: express.Express = express(); // Create a new express application instance

app.use(express.static(CLIENT_BUILD_PATH));

// Call midlewares
app.use(cors()); // Cors options
// app.use(helmet()); // Security
app.use(express.json()); // Read and parse body

app.use('/', routes); // Protected API endpoints

app.get('*', (_, response: express.Response) => {
  response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + baseURL);
});
server.on('error', console.error);
