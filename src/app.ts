import http from 'http';
import WebSocket from 'ws';
import express, { Application } from 'express';

import { config, Routes } from '../configs';

import UsersRouter from './routers/UsersRouter';
import RoomsRouter from './routers/RoomsRouter';

// web socket server
import init from './ws/init';

export class App {
  private static _instance: App;
  private _server: http.Server;
  private _app: Application;
  private _wss: WebSocket.Server;

  private constructor(
    private readonly _port: string | number = config.PORT,
    private readonly _prefix: string = config.API_PREFIX,
  ) {
    this._app = express();
    this._server = http.createServer(this._app);

    this.initMiddlewares();
    this.initRoutes();
    this.initWss();
  }

  public static get Instance(): App {
    return this._instance || (this._instance = new this());
  }

  public init(): void {
    this._server.listen(this._port, () => console.log(`App listen on port: ${this._port}`));
  }

  private initMiddlewares(): void {
    this._app.use(express.json());
  }

  private initRoutes(): void {
    this._app.use(`${this._prefix}${Routes.users}`, UsersRouter);
    this._app.use(`${this._prefix}${Routes.rooms}`, RoomsRouter);
  }

  private initWss(): void {
    this._wss = init(this._server, this._prefix);
  }
}

const app = App.Instance;
app.init();
