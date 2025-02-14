import pool from '../../utils/pool';

export default class Series {
  id: string;
  name: string;

  constructor(row: Series) {
    this.id = row.id;
    this.name = row.name;
  }

  static async insert(series: Series) {
    const { rows } = await pool.query(
      `INSERT INTO eskart_series (
        name
      )
      VALUES ($1)
      RETURNING *`,
      [series]
    );
    return new Series(rows[0]);
  }

  static async getAllSeries() {
    const { rows } = await pool.query(
      `SELECT *
      FROM eskart_series
      `
    );
    return rows.map(row => new Series(row));
  }

  static async updateSeries(series: Series) {
    const { rows } = await pool.query(
      `UPDATE eskart_series
      SET name=$1
      WHERE id=$2
      RETURNING *
      `,
      [series.name, series.id]
    );
    return new Series(rows[0]);
  }

  static async deleteSeries(seriesId: string) {
    const { rows } = await pool.query(
      `DELETE from eskart_series
      WHERE id=$1
      RETURNING *
      `,
      [seriesId]
    );
    return new Series(rows[0]);
  }
};
