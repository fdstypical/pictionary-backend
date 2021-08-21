import express, { Router } from 'express';
import RoomsController from '../controllers/RoomsController';

const RoomsRouter: Router = express.Router();

RoomsRouter.get('/', RoomsController.getRooms);

export default RoomsRouter;
