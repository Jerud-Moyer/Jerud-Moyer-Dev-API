import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
})

pool.on('connect', () => console.log('POSTGRES Connected!'))

export default pool
