import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js'; // Ajustá la ruta si db.js está en otra carpeta, ej: './src/config/db.js'

const resetUser = async () => {
  const username = 'diego'; // Tu nombre de usuario
  const plainPassword = 'neonflex2026'; // Tu nueva contraseña
  
  try {
    // 1. Encriptamos la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    // 2. Actualizamos el usuario si existe, o lo creamos si la tabla estaba vacía
    await pool.query(`
      INSERT INTO users (username, password) 
      VALUES ($1, $2)
      ON CONFLICT (username) 
      DO UPDATE SET password = EXCLUDED.password
    `, [username, hashedPassword]);

    console.log(`✅ Éxito: El usuario '${username}' está listo para usarse con la nueva contraseña.`);
  } catch (error) {
    console.error('❌ Error actualizando el usuario:', error);
  } finally {
    process.exit(0);
  }
};

resetUser();