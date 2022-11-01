import * as path from 'path';
import * as express from 'express';

import cors = require('cors');

import { getEnvVariables } from '@apps/helpers';

import auth from '../routes/auth.routes';
import space from '../routes/space.routes';

const { port, baseURL } = getEnvVariables();

class Server {
  private app: express.Application;
  private port: number;
  private baseURL: string;
  private publicPath: string;

  constructor() {
    this.port = port;
    this.baseURL = baseURL;
    this.publicPath = path.join(__dirname, '../wiki');

    this.app = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.static(this.publicPath)); // Public directory
    this.app.use(express.json()); // Read and parse body
    this.app.options('*', cors()); // Cors options
  }

  private routes(): void {
    console.log(this);
    this.app.use(`${this.baseURL}/auth`, auth);
    this.app.use(`${this.baseURL}/spaces`, space);

    this.app.get('*', (_, response: express.Response) => {
      response.sendFile(path.join(this.publicPath, 'index.html'));
    });
  }

  public listen() {
    const server = this.app.listen(this.port, () => {
      console.log('Listening at http://localhost:' + this.port + this.baseURL);
    });

    server.on('error', console.error);
  }
}

export default Server;
