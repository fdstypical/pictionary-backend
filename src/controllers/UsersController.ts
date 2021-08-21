import { Request, Response } from 'express';

class UsersController {
  async getUsers(req: Request, res: Response) {
    res.json({ test: 'users' });
  }
}

export default new UsersController();
