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

  private constructor(
    private readonly _port: string | number = config.PORT,
    private readonly _prefix: string = config.API_PREFIX,
  ) {
    this._app = express();
    this._server = http.createServer(this._app);

    this._app.use(express.json());

    this._app.use(`${this._prefix}${Routes.users}`, UsersRouter);
    this._app.use(`${this._prefix}${Routes.rooms}`, RoomsRouter);

    this.registerSocket();
  }

  public static get Instance(): App {
    return this._instance || (this._instance = new this());
  }

  public init(): void {
    this._server.listen(this._port, () => console.log(`App listen on port: ${this._port}`));
  }

  private registerSocket(): void {
    this._wss = new WebSocket.Server({ server: this._server, path: `${this._prefix}${Routes.ws}` });

    this._wss.on('connection', (ws) => {
      ws.on('message', (message) => {
        this._wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) client.send(message);
        });
      });
    });
  }
}

const app = App.Instance;
app.init();
