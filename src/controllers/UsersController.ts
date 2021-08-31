import { Request, Response } from 'express';
import { User } from '../models';

class UsersController {
  async getUsers(req: Request, res: Response) {
    const users = await User.findAll();
    res.json(users);
  }
}

export default new UsersController();
