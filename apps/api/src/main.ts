import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';

import { Message } from '@apps/api-interfaces';

const CLIENT_BUILD_PATH = path.join(__dirname, '../wiki');
const API_ROOT = '/api/v1';

// Express server
const app: express.Application = express();

// Public directory
app.use(express.static(CLIENT_BUILD_PATH));

// Read and parse body
app.use(express.json());

const greeting: Message = { message: 'Welcome to API!' };

// API routes
app.options('*', cors());

app.get(`${API_ROOT}`, (_, res) => {
  res.send(greeting);
});

app.get('*', (_, response: express.Response) => {
  response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
