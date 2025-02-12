import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export type ServerSideUser = {
  id: string,
  email: string,
  password_hash: string,
  first_name: string
}

export type ClientSideUser = {
  id: string,
  email: string,
  passwordHash?: string,
  firstName: string | null
}

export type RequestUser = {
  email: string,
  password?: string,
  passwordHash?: string,
  firstName?: string
}

export interface AuthParams {
  client: string;
  cookiePlease?: Boolean;
}

export interface AuthRequest extends Request {
  verification?: JwtPayload | null
}
