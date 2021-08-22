import express, { Application } from 'express';
import { config, Routes } from '../configs';

import UsersRouter from './routers/UsersRouter';
import RoomsRouter from './routers/RoomsRouter';

export class App {
  private static _instance: App;
  private _app: Application;

  private constructor(private readonly _port: string | number = config.PORT) {
    this._app = express();
    this._app.use(express.json());

    this._app.use(`${config.API_PREFIX}${Routes.users}`, UsersRouter);
    this._app.use(`${config.API_PREFIX}${Routes.rooms}`, RoomsRouter);
  }

  public static get Instance(): App {
    return this._instance || (this._instance = new this());
  }

  public init(): void {
    this._app.listen(this._port, () => console.log(`App listen on port: ${this._port}`));
  }
}

const app = App.Instance;
app.init();
