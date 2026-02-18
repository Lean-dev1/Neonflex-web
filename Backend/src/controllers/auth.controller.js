import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Esta funcion busca el usuario
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    // Luego hace la comparacion de contraseñas 
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Para luego con esta funvbion crear el token de seguridad
    const token = jwt.sign(
      { id: user.id, username: user.username }, 
      'secret_key_super_segura', // ---> esto luego lo tengo que ponr en .env
      { expiresIn: '2h' }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};