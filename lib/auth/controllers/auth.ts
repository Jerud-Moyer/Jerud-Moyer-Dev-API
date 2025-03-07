import { Request, Router } from 'express';
import ensureAuth from '../middleware/ensure-auth';
import UserService from '../services/user-service';
import { Response } from 'express-serve-static-core';
import { AuthRequest } from '../types/types';
import User from '../models/User';
import userService from '../services/user-service';

const setSessionCookie = (res: Response, user: User) => {
  const token = UserService.authToken(user);
  res.cookie('session', token, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true
  });
};

export default Router()
  .post('/signup', (req: Request, res, next) => {
    const client: string = req.body.client
    const cookiePlease: Boolean = req.body.cookiePlease || false

    UserService
      .signup(req.body, client)
      .then(user => {
        if(user) {
          if(cookiePlease) {
            setSessionCookie(res, user);
            res.send(user);
          } else {
            const token = userService.authToken(user)
            res.send({
              ...user.toJSON(),
              token
            })
          }
        }
      })
      .catch(next);
  })
  
  .post('/login', (req: Request, res, next) => {
    const client: string = req.body.client
    const cookiePlease: Boolean = req.body.cookiePlease || false

    UserService
      .authorize(req.body, client)
      .then(user => {
        if(cookiePlease) {
          setSessionCookie(res, user);
          res.send(user);
        } else {
          const token = userService.authToken(user)
          res.send({
            ...user.toJSON(),
            token
          })
        }
      })
      .catch(next);
  })

  .get('/verify:cookiePlease?', ensureAuth, (req: AuthRequest, res) => {
    res.send(req.verification);
  });
