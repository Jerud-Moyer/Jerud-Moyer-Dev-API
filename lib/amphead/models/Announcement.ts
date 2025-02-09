import pool from '../../utils/pool';
import { PublicAnnouncement } from '../types/types';

export default class Announcement {
  id;
  side;
  title;
  body;

  constructor(row: PublicAnnouncement) {
    this.id = row.id;
    this.side = row.side;
    this.title = row.title;
    this.body = row.body;
  }

  static async insert(announcement: PublicAnnouncement) {
    const { rows } = await pool.query(
      `INSERT INTO amphead_announcements (side, title, body)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [announcement.side, announcement.title, announcement.body]
    );
    return new Announcement(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM amphead_announcements',
    );
    return rows.map(row => new Announcement(row));
  }

  static async findById(id: String) {
    const { rows } = await pool.query(
      'SELECT * FROM amphead_announcements WHERE id=$1',
      [id]
    );
    if(!rows[0]) return null;
    else return new Announcement(rows[0]);
  }

  static async update(id: String, announcement: PublicAnnouncement) {
    const { rows } = await pool.query(
      `UPDATE amphead_announcements
      SET side=$1,
          title=$2,
          body=$3
      WHERE id=$4
      RETURNING *
      `,
      [announcement.side, announcement.title, announcement.body, id]
    );
    return new Announcement(rows[0]);
  }

  static async delete(id: String) {
    const { rows } = await pool.query(
      'DELETE FROM amphead_announcements WHERE id=$1 RETURNING *',
      [id]
    );
    return new Announcement(rows[0]);
  }
};
