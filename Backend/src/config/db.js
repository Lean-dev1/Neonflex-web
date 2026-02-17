import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Usamos el Pool de pg
export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});