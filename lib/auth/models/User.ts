import pool from '../../utils/pool'
import { ClientSideUser, RequestUser, ServerSideUser } from '../types/types';

export default class User {
  id: string;
  email: string;
  passwordHash?: string;
  firstName: string;

  constructor(row: ServerSideUser) {
    this.id = row.id;
    this.email = row.email;
    this.passwordHash = row.password_hash;
    this.firstName = row.first_name;
  }

  static async insert(user: RequestUser, client: String): Promise<User> {
    const { rows } = await pool.query(
      `INSERT INTO ${client}_users (email, password_hash, first_name)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [user.email, user.passwordHash, user.firstName]
    );
    return new User(rows[0]);
  }

  static async findByEmail(email: string, client: String): Promise<User | null> {
    const { rows } = await pool.query(
      `SELECT * FROM ${client}_users WHERE email=$1`,
      [email]
    );

    if(!rows[0]) return null;

    return new User(rows[0]);
  }

  toJSON() {
    const obj = { ...this };
    delete obj.passwordHash;
    return obj;
  }
}
