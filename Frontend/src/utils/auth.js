// src/utils/auth.js
import { safeStorage } from './storage';

const KEY = 'token';
let memoryToken = null; // Respaldo en memoria RAM si el disco está bloqueado

export const getToken = () => memoryToken ?? safeStorage.get(KEY);
export const setToken = (token) => { memoryToken = token; safeStorage.set(KEY, token); };
export const clearToken = () => { memoryToken = null; safeStorage.remove(KEY); };

// Verifica si el token existe y si su fecha de vencimiento (exp) todavía no pasó
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  try {
    // Decodifica la carga útil (payload) del JWT
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return typeof payload.exp === 'number' && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};