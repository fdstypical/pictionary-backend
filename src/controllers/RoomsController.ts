import { Request, Response } from 'express';
import httpContext from 'express-http-context';

import { User, Room } from '../models';

class RoomsController {
  async getRooms(req: Request, res: Response) {
    const rooms = await Room.findAll({ include: [{ model: User }] });
    res.json(rooms);
  }

  async getRoom(req: Request, res: Response) {
    const { id } = req.params;
    const room = await Room.findByPk(id, { include: [{ model: User }] });
    res.json(room);
  }

  async createRoom(req: Request, res: Response) {
    const { name } = req.body;
    const room = await Room.create({ name });
    res.json(room);
  }

  async deleteRoom(req: Request, res: Response) {
    const { id } = req.params;
    const code = await Room.destroy({ where: { id } });
    res.json({ code });
  }

  async addUser(req: Request, res: Response) {
    const roomId = req.params.id;
    const { id: userId } = httpContext.get('user');

    const user = await User.findByPk(userId);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const room: any = await Room.findByPk(roomId, { include: [{ model: User }] });
    if (!room) return res.status(400).json({ message: 'Room not found' });

    const updatedRoom = await room.addUser(user);
    const reloaderRoom = await updatedRoom.reload({ include: [{ model: User }] });
    res.json(reloaderRoom);
  }

  async leaveRoom(req: Request, res: Response) {}
}

export default new RoomsController();
