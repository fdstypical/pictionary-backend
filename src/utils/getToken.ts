import { Request } from 'express';
export default (req: Request): string | null => req.get('Authorization')?.split(' ')[1];
