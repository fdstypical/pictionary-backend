import { Request, Response } from 'express';

import Room from '../models/Room';

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
}

export default new RoomsController();
