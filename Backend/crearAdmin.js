import { pool } from './src/config/db.js'; // Ajustá la ruta a db.js si es necesario
import bcrypt from 'bcryptjs';

const setupAdmin = async () => {
  try {
    // 1. Creamos la tabla de usuarios si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);
    console.log('✅ Tabla "users" verificada/creada.');

    // 2. Preparamos los datos de Diego
    const username = 'diego'; 
    const passwordPlain = '123'; 

    // Encriptamos la contraseña tal como la lee tu controlador
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordPlain, salt);

    // 3. Insertamos el usuario (Si ya existe, no hace nada para no dar error)
    await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING',
      [username, hashedPassword]
    );

    console.log(`✅ Usuario '${username}' creado con éxito. Ya podés probar el Login.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error configurando la base de datos:', error);
    process.exit(1);
  }
};

setupAdmin();