import { NextFunction, Response } from "express";
import { AuthRequest } from '../types/types'

import UserService from '../services/user-service';

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  const session = req.cookies.session;
  const verification = UserService.verifyToken(session);
  req.verification = verification;
  next();
};
