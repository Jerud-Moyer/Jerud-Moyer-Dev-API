import pool from "../../utils/pool";
import { ClientSideFact, ServerSideFact } from "../types/types";

class Fact {
  id: number;
  type: string;
  colorCode: string;
  text: string;
  imageUrl: string;

  constructor(row: ServerSideFact) {
    this.id = row.id;
    this.type = row.type;
    this.colorCode = row.color_code;
    this.text = row.text;
    this.imageUrl = row.image_url;
  }

  static async insert(fact: ClientSideFact) {
    const { rows } = await pool.query(
      `INSERT into facts (type, color_code, text, image_url)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [fact.type, fact.colorCode, fact.text, fact.imageUrl]
    );

    return new Fact(rows[0]);
    
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM facts',
    );

    return rows.map(row => new Fact(row));
  }

  static async delete(id: number) {
    const { rows } = await pool.query(
      'DELETE FROM facts WHERE id=$1 RETURNING *',
      [id]
    );

    if(!rows[0]) return null;
    return new Fact(rows[0]);
  }

  static async findById(id: number) {
    const { rows } = await pool.query(
      'SELECT * FROM facts WHERE id=$1',
      [id]
    );

    if(!rows[0]) return null;
    else return new Fact(rows[0]);
  }

  static async update(id: number, fact: ClientSideFact) {
    const { rows } = await pool.query(
      `UPDATE facts
      SET type=$1,
          color_code=$2,
          text=$3,
          image_url=$4
      WHERE id=$5
      RETURNING *
      `,
      [fact.type, fact.colorCode, fact.text, fact.imageUrl, id]
    );
    return new Fact(rows[0]);
  }
}

export default Fact
