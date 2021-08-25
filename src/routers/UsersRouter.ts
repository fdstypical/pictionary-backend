import express, { Router } from 'express';
import UsersController from '../controllers/UsersController';

const UsersRouter: Router = express.Router();

UsersRouter.get('/', UsersController.getUsers);
UsersRouter.post('/', UsersController.createUser);

export default UsersRouter;
