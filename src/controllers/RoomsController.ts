import { Request, Response } from 'express';

class RoomsController {
  async getRooms(req: Request, res: Response) {
    res.json({ test: 'rooms' });
  }
}

export default new RoomsController();
