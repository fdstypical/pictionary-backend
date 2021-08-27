import express, { Router } from 'express';

import AuthController from '../controllers/AuthController';
import checkAuth from '../middlewares/checkAuth';

const AuthRouter: Router = express.Router();

AuthRouter.post('/signup', AuthController.signup);
AuthRouter.post('/login', AuthController.login);
AuthRouter.get('/test-token', [checkAuth], AuthController.testToken);

export default AuthRouter;
