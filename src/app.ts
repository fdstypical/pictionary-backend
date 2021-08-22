import http from 'http';
import WebSocket from 'ws';
import express, { Application } from 'express';

import { config, Routes } from '../configs';

import UsersRouter from './routers/UsersRouter';
import RoomsRouter from './routers/RoomsRouter';

export class App {
  private static _instance: App;
  private _app: Application;
  private _server: http.Server;
  private _wss: WebSocket.Server;

  private constructor(private readonly _port: string | number = config.PORT) {
    this._app = express();
    this._server = http.createServer(this._app);

    this._app.use(express.json());

    this._app.use(`${config.API_PREFIX}${Routes.users}`, UsersRouter);
    this._app.use(`${config.API_PREFIX}${Routes.rooms}`, RoomsRouter);

    this.registerSocket();
  }

  public static get Instance(): App {
    return this._instance || (this._instance = new this());
  }

  public init(): void {
    this._server.listen(this._port, () => console.log(`App listen on port: ${this._port}`));
  }

  private registerSocket(): void {
    this._wss = new WebSocket.Server({ server: this._server, path: `${config.API_PREFIX}${Routes.ws}` });

    this._wss.on('connection', (ws) => {
      ws.on('message', (message) => console.log(message));
    });
  }
}

const app = App.Instance;
app.init();
