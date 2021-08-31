import { Request, Response } from 'express';

import { User, Room } from '../models';

class RoomsController {
  async getRooms(req: Request, res: Response) {
    const rooms = await Room.findAll();
    res.json(rooms);
  }

  async createRoom(req: Request, res: Response) {
    const { name } = req.body;
    const room = await Room.create({ name });
    res.json(room);
  }

  async addUser(req: Request, res: Response) {
    const roomId = req.params.id;
    const userId = req.params.userId;

    const room = await Room.findByPk(roomId);
    if (!room) return res.status(400).json({ message: 'Room not found' });

    const user = await User.findByPk(userId, { include: Room });
    if (!user) return res.status(400).json({ message: 'User not found' });

    console.log(user, room);

    res.end();
  }
}

export default new RoomsController();
