import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/User';
import generateToken from '../utils/generateToken';

import jwt from 'jsonwebtoken';

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
      res.status(409).json({ message: 'User with this email already exists' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.status(401).json({ message: 'Incorrect email or password' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: 'Incorrect email or password' });
      return;
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token });
  }

  async testToken(req: Request, res: Response) {
    const token = req.get('Authorization') || null;

    if (!token) {
      res.status(400).json({ message: 'Authorization header not transferred' });
      return;
    }

    const tokenPayload: any = jwt.decode(token);

    if (!tokenPayload && !tokenPayload.id) {
      res.status(400).json({ message: 'Invalid token' });
    }

    const user = await User.findByPk(tokenPayload.id);
    res.json(user);
  }
}

export default new AuthController();
