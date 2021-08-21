import express, { Application } from 'express';
import { config, Routes } from '../configs';

import UsersRouter from './routers/UsersRouter';
import RoomsRouter from './routers/RoomsRouter';

const app: Application = express();
app.use(express.json());

app.use(`${config.API_PREFIX}${Routes.users}`, UsersRouter);
app.use(`${config.API_PREFIX}${Routes.rooms}`, RoomsRouter);

app.listen(config.PORT, () => {
  return console.log(`server is listening on ${config.PORT}`);
});
