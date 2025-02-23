import pool from "../../utils/pool";

export class Blog {
  id: number;
  name: string;

  constructor(row: Blog) {
    this.id = row.id;
    this.name = row.name;
  }

  static async find() {
    const { rows } = await pool.query(
      `SELECT * FROM ventrella_blogs`
    )
    return rows.map(row => new Blog(row))
  }
}
