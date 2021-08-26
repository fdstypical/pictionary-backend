import express, { Router } from 'express';
import AuthController from '../controllers/AuthController';

const AuthRouter: Router = express.Router();

AuthRouter.post('/signup', AuthController.signup);
AuthRouter.post('/login', AuthController.login);
AuthRouter.get('/test-token', AuthController.testToken);

export default AuthRouter;
