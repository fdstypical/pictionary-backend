import express, { Router } from 'express';

import RoomsController from '../controllers/RoomsController';
import checkAuth from '../middlewares/checkAuth';

const RoomsRouter: Router = express.Router();

RoomsRouter.use(checkAuth);
RoomsRouter.get('/', RoomsController.getRooms);
RoomsRouter.get('/:id', RoomsController.getRoom);
RoomsRouter.post('/', RoomsController.createRoom);
RoomsRouter.post('/enter/:id', RoomsController.addUser);
RoomsRouter.post('/leave/:id', RoomsController.leaveRoom);
RoomsRouter.delete('/:id', RoomsController.deleteRoom);

export default RoomsRouter;
