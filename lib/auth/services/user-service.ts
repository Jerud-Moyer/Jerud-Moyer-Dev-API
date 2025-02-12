import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';
import { ClientSideUser, RequestUser } from '../types/types';

const signup = async({  email, password, firstName }: RequestUser, client: String) => {
  if(password) {
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const addUser: User = await User.insert({
      email,
      passwordHash,
      firstName: firstName
    }, client);
    return addUser;
  }
};

const authorize = async({ email, password }: RequestUser, client: string) => {
  const user = await User.findByEmail(email, client);
  if(!user || !user.passwordHash || !password) throw new Error('Invalid user/password');

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if(!validPassword) throw new Error('Invalid user/password');

  return user;
};

const authToken = (user: User) => {
  const token = jwt.sign({
    payload: user.toJSON()
  }, process.env.APP_SECRET as string, {
    expiresIn: '24h'
  });

  return token;
};

const verifyToken = (token: string): JwtPayload | null => {
  const decoded = jwt.verify(token, process.env.APP_SECRET as string);
  if(typeof decoded != 'string') {
    return decoded.payload;
  } else return null
};

export default {
  signup,
  authorize,
  authToken,
  verifyToken
};
