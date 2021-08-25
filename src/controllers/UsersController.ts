import { Request, Response } from 'express';

import User from '../models/User';

class UsersController {
  async getUsers(req: Request, res: Response) {
    const users = await User.findAll();
    res.json(users);
  }

  async createUser(req: Request, res: Response) {
    const name = req.body.name;
    const user = await User.create({ name });
    res.json(user);
  }
}

export default new UsersController();
