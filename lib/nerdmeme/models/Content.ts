import pool from '../../utils/pool';
import { ContentRequest, Meme, MemeContentType } from '../types.types';

export default class Content {
  id: number;
  world: string;
  content: string;
  
  constructor(row: Content) {
    this.id = row.id;
    this.world = row.world;
    this.content = row.content;
  }
  

  static async initialInsert(
    contentType: MemeContentType, 
    world: string, 
    content: Content
    ) {
    const { rows } = await pool.query(
      `INSERT INTO nerdmeme_${contentType} (world, content)
      VALUES ($1, $2)
      RETURNING *
      `,
      [world, content]
    );
    return new Content(rows[0]);
  }

  static async insert(contentType: MemeContentType, content: Content) {
    const { rows } = await pool.query(
      `INSERT INTO nerdmeme_${contentType} (world, content)
      VALUES ($1, $2)
      RETURNING *
      `,
      [content.world, content.content]
    );
    return new Content(rows[0]);
  }

  static async getCustomMeme(meme: string[]) {
    const { rows } = await pool.query(
      `SELECT * FROM (SELECT content AS setting
      FROM nerdmeme_settings 
      WHERE world=$1
      ORDER BY RANDOM()
      LIMIT 1) AS setting
      CROSS JOIN
      (SELECT content AS image
      FROM nerdmeme_images
      WHERE world=$2
      ORDER BY RANDOM()
      LIMIT 1) AS image
      CROSS JOIN
      (SELECT content AS quote
      FROM nerdmeme_quotes
      WHERE world=$3
      ORDER BY RANDOM()
      LIMIT 1) AS quote
      CROSS JOIN
      (SELECT content AS author
      FROM nerdmeme_authors
      WHERE world=$4
      ORDER BY RANDOM()
      LIMIT 1) AS author`,
      [meme[0], meme[1], meme[2], meme[3]]
    );
    return rows[0];
  }

  static async getSetting(world: string) {
    const { rows } = await pool.query(
      `SELECT content AS setting
      FROM nerdmeme_settings
      WHERE world=$1
      ORDER BY RANDOM()
      LIMIT 1`,
      [world]
    );
   
    return rows[0];
  }

  static async getImage(world: string) {
    const { rows } = await pool.query(
      `SELECT content AS image
      FROM nerdmeme_images
      WHERE world=$1
      ORDER BY RANDOM()
      LIMIT 1`,
      [world]
    );
    
    return rows[0];
  }

  static async getQuote(world: string) {
    const { rows } = await pool.query(
      `SELECT content AS quote
      FROM nerdmeme_quotes
      WHERE world=$1
      ORDER BY RANDOM()
      LIMIT 1`,
      [world]
    );
    
    return rows[0];
  }

  static async getAuthor(world: string) {
    const { rows } = await pool.query(
      `SELECT content AS author
      FROM nerdmeme_authors
      WHERE world=$1
      ORDER BY RANDOM()
      LIMIT 1`,
      [world]
    );
  
    return rows[0];
  }

  static async getContent(type: MemeContentType) {
    const { rows } = await pool.query(
      `SELECT * FROM nerdmeme_${type}`
    );
    return rows;
  }

  static async findById(type: MemeContentType, id: number) {
    const { rows } = await pool.query(
      `SELECT * FROM nerdmeme_${type}
      WHERE ID=$1`,
      [id]
    );
    if(!rows[0]) return null;
    else return new Content(rows[0]);
  }

  static async deleteContent(type: MemeContentType, id: number) {
    const { rows } = await pool.query(
      `DELETE FROM nerdmeme_${type}
      WHERE id=$1
      RETURNING *`,
      [id]
    );
    return new Content(rows[0]);
  }

  static async updateContent(type: MemeContentType, id: number, content: ContentRequest) {
    const { rows } = await pool.query(
      `UPDATE nerdmeme_${type}
      SET world=$1,
          content=$2
      WHERE id=$3
      RETURNING *
      `,
      [content.world, content.content, id]
    );
    return new Content(rows[0]);
  }
};
