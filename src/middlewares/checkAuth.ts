import { Request, Response, NextFunction } from 'express';
import httpContext from 'express-http-context';
import jwt from 'jsonwebtoken';

import { config } from '../../configs';
import getToken from '../utils/getToken';

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') return next();

  const token = getToken(req);
  if (!token) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  try {
    const tokenPayload = jwt.verify(token, config.SECRET);
    httpContext.set('user', tokenPayload);
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Not authorized' });
  }
};
