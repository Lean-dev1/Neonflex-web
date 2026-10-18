import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const login = async (req, res) => {
  const { username, password } = req.body;
  
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  if (result.rows.length === 0) return res.status(401).json({ message: "Credenciales incorrectas" });
  
  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Credenciales incorrectas" });
 
const token = jwt.sign(
    { id: user.id, username: user.username }, 
    env.jwtSecret,
    { 
      expiresIn: env.constants.JWT_EXPIRES_IN,
      issuer: 'neonflex-api' 
    }
  );
  
  res.json({ token });
};