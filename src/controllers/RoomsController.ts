import { Request, Response } from 'express';
import { User, Room } from '../models';

class RoomsController {
  async getRooms(req: Request, res: Response) {
    const rooms = await Room.findAll({ include: [{ model: User }] });
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

    const room: any = await Room.findByPk(roomId, { include: [{ model: User }] });
    if (!room) return res.status(400).json({ message: 'Room not found' });

    const user = await User.findByPk(userId);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const updatedRoom = await room.addUser(user);
    const reloaderRoom = await updatedRoom.reload({ include: [{ model: User }] });
    res.json(reloaderRoom);
  }
}

export default new RoomsController();
