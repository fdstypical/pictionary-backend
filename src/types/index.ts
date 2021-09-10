import { Request, Response, NextFunction } from 'express';

export type ExpressHandlerDescriptor = TypedPropertyDescriptor<
  (req: Request, res: Response, next: NextFunction) => Promise<any>
>;
