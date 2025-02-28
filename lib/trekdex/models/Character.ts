import pool from '../../utils/pool';
import { ServerSideCharacter } from '../types/types';

export default class Character {
  id;
  name;
  affiliation;
  origin;
  race;
  imageUrl;

  constructor(row: ServerSideCharacter) {
    this.id = row.id;
    this.name = row.name;
    this.affiliation = row.affiliation;
    this.origin = row.origin;
    this.race = row.race;
    this.imageUrl = row.image_url;
  }

  static async insert(character: Character) {
    const { rows } = await pool.query(
      `INSERT into trekdex_characters (name, affiliation, origin, race, image_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
      [character.name, character.affiliation, character.origin, character.race, character.imageUrl]
    );
    return new Character(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM trekdex_characters',
    );

    return rows.map(row => new Character(row));
  }

  static async findById(id: number) {
    const { rows } = await pool.query(
      'SELECT * FROM trekdex_characters WHERE id=$1',
      [id]
    );
    if(!rows[0]) return null;
    else return new Character(rows[0]);
  }

  static async findByName(name: string) {
    const searchName = `%${name}%`;
    const { rows } = await pool.query(
      `
      SELECT * FROM trekdex_characters 
      WHERE name 
      ILIKE $1
      `,
      [searchName]      
    );
    if(!rows[0]) return null;
    else return rows.map(character => new Character(character));
  }

  static async findByColumn(column: string, searchTerm: string) {
    const term = `%${searchTerm}%`;
    const { rows } = await pool.query(
      `SELECT * FROM trekdex_characters
        WHERE ${column}
        ILIKE $1`,
      [term]
    );
    if(!rows[0]) return null;
    else return rows.map(character => new Character(character));
  }

  static async update(id: number, character: Character) {
    const { rows } = await pool.query(
      `UPDATE trekdex_characters
      SET name=$1,
          affiliation=$2,
          origin=$3,
          race=$4,
          image_url=$5
      WHERE id=$6
      RETURNING *
      `,
      [character.name, character.affiliation, character.origin, character.race, character.imageUrl, id]
    );
    return new Character(rows[0]);
  }
  
  static async delete(id: number) {
    const { rows } = await pool.query(
      'DELETE FROM trekdex_characters WHERE id=$1 RETURNING *',
      [id]
    );
    return new Character(rows[0]);
  }
};
