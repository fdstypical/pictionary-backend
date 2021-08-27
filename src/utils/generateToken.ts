import jwt from 'jsonwebtoken';
import { config } from '../../configs';

export default (payload: object, expiresIn: string = '24h') =>
  jwt.sign(payload, config.SECRET, { expiresIn });
