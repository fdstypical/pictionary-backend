import { Request, Response } from 'express';
import { Room, User } from '../models';
import catchErrors from '../decorators/catchErrors';

class UsersController {
  @catchErrors()
  async getUsers(req: Request, res: Response) {
    const users = await User.findAll({ include: [{ model: Room }] });
    res.json(users);
  }

  @catchErrors()
  async getOneUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.findByPk(id, { include: [{ model: Room }] });
    res.json(user);
  }

  @catchErrors()
  async patchUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Name is required' });
    }

    const [, [updatedUser]] = await User.update(
      { name },
      { where: { id }, returning: true },
    );
    res.json(updatedUser);
  }
}

export default new UsersController();
