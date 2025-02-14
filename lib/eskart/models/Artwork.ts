import { ArtworkRow } from "../types/types";
import pool from '../../utils/pool';

export default class Artwork {
  id;
  title;
  medium;
  dimensions;
  year;
  slug;
  isFeatured;
  seriesId;
  seriesName;

  constructor(row: ArtworkRow) {
    this.id = row.id,
    this.title = row.title,
    this.medium = row.medium,
    this.dimensions = row.dimensions,
    this.year = row.year,
    this.slug = row.slug,
    this.isFeatured = row.is_featured,
    this.seriesId = row.series_id,
    this.seriesName = row.series_name;
  }

  static async insert(artWork: ArtworkRow) {
    const { rows } = await pool.query(
      `INSERT INTO eskart_art_works (
        title,
        medium,
        dimensions,
        year,
        slug,
        is_featured,
        series_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        artWork.title, 
        artWork.medium, 
        artWork.dimensions, 
        artWork.year, 
        artWork.slug, 
        artWork.is_featured, 
        artWork.series_id
      ]
    );

    return new Artwork(rows[0]);
  }

  static async getAllWorks() {
    const { rows } = await pool.query(
      `SELECT 
      "eskart_art_works".id as id, 
      title, 
      medium, 
      dimensions, 
      year, 
      slug, 
      is_featured, 
      series_id,
      eskart_series.name as series_name
      FROM eskart_art_works
      INNER JOIN eskart_series on "eskart_art_works".series_id=eskart_series.id
      `
    );

    return rows.map(row => new Artwork(row));
  }

  static async updateIsFeatured (boolean: Boolean, id: number) {
    const { rows } = await pool.query(
      `UPDATE eskart_art_works
      SET is_featured=$1
      WHERE id=$2
      RETURNING *
      `,
      [boolean, id]
    );

    return new Artwork(rows[0]);
  }

  static async updateArtWork (id: number, artWork: ArtworkRow) {
    const { rows } = await pool.query(
      `UPDATE eskart_art_works
      SET title=$1,
          medium=$2,
          dimensions=$3,
          year=$4,
          slug=$5,
          is_featured=$6,
          series_id=$7
      WHERE id=$8
      RETURNING *
      `,
      [
        artWork.title, 
        artWork.medium, 
        artWork.dimensions, 
        artWork.year, 
        artWork.slug, 
        artWork.is_featured, 
        artWork.series_id, id
      ]
    );
    return new Artwork(rows[0]);
  }

  static async deleteWork (id: number) {
    const { rows } = await pool.query(
      `DELETE FROM eskart_art_works
      WHERE id=$1
      RETURNING *
      `,
      [id]
    );

    return new Artwork(rows[0]);
  }
};
