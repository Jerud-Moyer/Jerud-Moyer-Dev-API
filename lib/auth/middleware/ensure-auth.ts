import { NextFunction, Response } from "express";
import { AuthRequest } from '../types/types'

import UserService from '../services/user-service';

const breakoutToken = (bearerToken: string): string => {
  const tokenArr = bearerToken.split(' ')
  return tokenArr[0] === 'Bearer'
    ? tokenArr[1]
    : 'bad-token';
}

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  let session = null
  console.log('CP in middleware => ', req.params.cookiePlease)
  const cookiePlease = Boolean(req.params.cookiePlease)
  if(cookiePlease) {
    session = req.cookies.session;
  } else {
    session = breakoutToken(req.headers.authorization as string)
  }
  const verification = UserService.verifyToken(session);
  req.verification = verification;
  next();
};
