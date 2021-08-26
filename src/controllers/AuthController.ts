import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/User';

class AuthController {
  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 7);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, email, password: hashPassword },
    });

    if (created) {
      res.json(user);
    } else {
      res.json({ message: 'User with this email already exists' });
    }
  }

  async login(req: Request, res: Response) {}

  async testToken(req: Request, res: Response) {}
}

export default new AuthController();
