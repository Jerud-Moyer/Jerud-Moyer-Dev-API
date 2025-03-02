import pool from '../../utils/pool';

export class Column {
  id: number;
  title: string;
  content: string;
  created_at: string;
  publish_date: string;
  published: string;
  blog_id: string;

  constructor(row: Column) {
    this.id = row.id;
    this.title = row.title;
    this.content = row.content;
    this.created_at = row.created_at;
    this.publish_date = row.publish_date;
    this.published = row.published;
    this.blog_id = row.blog_id;
  }
  
  static async insert(column: Column) {
    console.log('col in model => ', column)
    const { rows } = await pool.query(
      `INSERT into ventrella_columns (title, content, created_at, published, blog_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [column.title, column.content, column.created_at, column.published, column.blog_id]
    )  
    return new Column(rows[0])
  }

  static async find() {
    const { rows } = await pool.query(
      `SELECT * FROM ventrella_columns
      ORDER BY created_at DESC
      `
    )
    return rows.map(row => new Column(row))
  }
  
  static async findByBlogId(blogId: number) {
    const { rows } = await pool.query(
      `SELECT * FROM ventrella_columns
      WHERE blog_id=$1
      ORDER BY created_at DESC
      `,
      [blogId]
    )
    return rows.map(row => new Column(row))
  }

  static async findPublished(blogId: number) {
    const { rows } = await pool.query(
      `SELECT * FROM ventrella_columns
      WHERE published=true
      AND blog_id=$1
      ORDER BY created_at DESC
      `,
      [blogId]
    )
    return rows.map(row => new Column(row))
  }

  static async findById(id: number) {
    const { rows } = await pool.query(
      'SELECT * FROM ventrella_columns WHERE id=$1',
      [id]
    )
    if(!rows[0]) return null
    else return new Column(rows[0])
  }

  static async update(col: Column) {
    const { rows } = await pool.query(
      `UPDATE ventrella_columns
      SET title=$1,
          content=$2,
          created_at=$3,
          published=$4,
          blog_id=$5
      WHERE id=$6
      RETURNING * 
      `,
      [col.title, col.content, col.created_at, col.published, col.blog_id, col.id]
    )
    return new Column(rows[0])
  }

  static async delete(id: number) {
    const { rows } = await pool.query(
      `DELETE FROM ventrella_columns
      WHERE id=$1
      RETURNING *
      `,
      [id]
    )
    return new Column(rows[0])
  }
  
  static async getCountPublished(blogId: number) {
    const { rows } = await pool.query(
      `SELECT COUNT(*) 
      FROM ventrella_columns
      WHERE published=true
      AND blog_id=$1
      `,
      [blogId]
    )
    return rows[0]
  }
  
  static async getCount(blogId: number) {
    const { rows } = await pool.query(
      `SELECT COUNT(*) 
      FROM ventrella_columns
      WHERE blog_id=$1
      `,
      [blogId]
    )
    return rows[0]
  }
}
