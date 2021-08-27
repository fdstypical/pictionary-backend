import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/User';
import generateToken from '../utils/generateToken';

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

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email }, raw: true });

    if (!user) {
      res.json({ message: 'Incorrect email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.json({ message: 'Incorrect email or password' });
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token });
  }

  async testToken(req: Request, res: Response) {}
}

export default new AuthController();
