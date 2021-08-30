import express, { Router } from 'express';

import RoomsController from '../controllers/RoomsController';
import checkAuth from '../middlewares/checkAuth';

const RoomsRouter: Router = express.Router();

RoomsRouter.use(checkAuth);
RoomsRouter.get('/', RoomsController.getRooms);
RoomsRouter.post('/', RoomsController.createRoom);

export default RoomsRouter;
