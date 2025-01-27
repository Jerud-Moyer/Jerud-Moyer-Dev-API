import { Pool, Client } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false }
})

pool.on('connect', () => console.log('POSTGRES Connected!'))

export default pool
