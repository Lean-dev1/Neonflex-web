import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js'; // Importamos config

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) return res.status(400).json({ message: "Credenciales incorrectas" });
    
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Credenciales incorrectas" });
   
    const token = jwt.sign(
      { id: user.id, username: user.username }, 
      env.jwtSecret, // Usamos la variable validada
      { expiresIn: '2h',
        issuer: 'neonflex-api'
       }
    );
    res.json({ token });
  } catch (error) {
    console.error("Error en login:", error.message);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};