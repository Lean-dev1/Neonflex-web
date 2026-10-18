import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js'; // Asegurate de que la ruta suba un nivel para encontrar config

const username = process.argv[2];
const password = process.env.ADMIN_PASSWORD;

if (!username || !password || password.length < 12) {
  console.error("❌ Uso incorrecto o contraseña muy corta (mínimo 12 caracteres).");
  console.error("👉 Ejemplo: ADMIN_PASSWORD='MiClaveSegura2026' node create-admin.js minombre");
  process.exit(1);
}

try {
  const hash = await bcrypt.hash(password, 12);
  await pool.query(
    `INSERT INTO users (username, password) VALUES ($1, $2)
     ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password`,
    [username, hash]
  );
  console.log(`✅ Usuario "${username}" creado/actualizado exitosamente.`);
} catch (error) {
  console.error("❌ Error en la base de datos:", error.message);
} finally {
  await pool.end();
}