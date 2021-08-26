import http from 'http';
import express, { Application } from 'express';

import { config, Routes } from '../configs';

// database
import db, { Database } from '../db';

// routers
import UsersRouter from './routers/UsersRouter';
import RoomsRouter from './routers/RoomsRouter';
import AuthRouter from './routers/AuthRouter';

// web socket server
import WebSocketServer from './ws/init';

export class App {
  private static _instance: App;
  private _server: http.Server;
  private _app: Application;
  private _wss: WebSocketServer;

  private constructor(
    private readonly _port: number = config.PORT,
    private readonly _prefix: string = config.API_PREFIX,
    private readonly _db: Database = db,
  ) {
    this._app = express();
    this._server = http.createServer(this._app);

    this.initMiddlewares();
    this.initRoutes();
    this.initWss();
    this.initDb();
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
    this._app.use(`${this._prefix}${Routes.auth}`, AuthRouter);
  }

  private initWss(): void {
    this._wss = new WebSocketServer(this._server, this._prefix);
  }

  private initDb(): void {
    this._db
      .migrate()
      .then(() => console.log('Successfulа migration'))
      .catch((err) => console.error('Failed migration', err));
  }
}

const app = App.Instance;
app.init();
