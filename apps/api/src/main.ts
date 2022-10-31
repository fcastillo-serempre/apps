import * as express from 'express';
import * as path from 'path';
import { Message } from '@apps/api-interfaces';

const CLIENT_BUILD_PATH = path.join(__dirname, '../wiki');

const app = express();
app.use(express.static(CLIENT_BUILD_PATH));

const greeting: Message = { message: 'Welcome to API!' };

app.get('/api', (_, res) => {
  res.send(greeting);
});

app.get('*', (_, response: express.Response) => {
  response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
