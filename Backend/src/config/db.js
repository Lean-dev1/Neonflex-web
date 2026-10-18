import pg from 'pg';
import { env } from './env.js';

export const pool = new pg.Pool({
  connectionString: env.databaseUrl,
  // Al poner true, garantizamos que nadie intercepte la conexión a la base de datos
  ssl: env.isProd ? { rejectUnauthorized: true } : false,
  
  // Optimizaciones de rendimiento y prevención de cuellos de botella
  max: 10, // Máximo 10 conexiones simultáneas
  idleTimeoutMillis: 30_000, // Cierra conexiones inactivas después de 30 segundos
  connectionTimeoutMillis: 5_000, // Falla rápido si no puede conectarse en 5 segundos
  statement_timeout: 10_000, // Cancela cualquier consulta SQL que tarde más de 10 segundos
});

// Previene que el servidor Node.js se apague si hay un micro-corte de red con la DB
pool.on('error', (err) => {
  console.error('Error inesperado en el pool de Postgres:', err.message);
});