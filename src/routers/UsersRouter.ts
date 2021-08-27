import express, { Router } from 'express';

import UsersController from '../controllers/UsersController';
import checkAuth from '../middlewares/checkAuth';

const UsersRouter: Router = express.Router();

UsersRouter.use(checkAuth);
UsersRouter.get('/', UsersController.getUsers);

export default UsersRouter;
