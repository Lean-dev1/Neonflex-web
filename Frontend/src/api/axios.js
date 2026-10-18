// src/api/axios.js
import axios from 'axios';
import { getToken, clearToken } from '../utils/auth';

// En desarrollo usa el localhost; en producción exige la variable de entorno
const baseURL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:3000/api' : '');

if (!baseURL) {
  throw new Error('Falta VITE_API_URL en el build de producción.');
}
if (import.meta.env.PROD && !baseURL.startsWith('https://')) {
  throw new Error('VITE_API_URL debe usar https:// en producción.');
}

// Timeout de 15 segundos: ideal para los "cold starts" de Render
const api = axios.create({ baseURL, timeout: 60000 });

// INTERCEPTOR DE IDA
api.interceptors.request.use((config) => {
  const token = getToken();
  // Solo inyecta el token si la petición va a TU dominio, no a uno externo
  const isAbsolute = /^https?:\/\//i.test(config.url ?? ''); 
  if (token && !isAbsolute) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// INTERCEPTOR DE VUELTA
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si la petición falla por 401 (y no es porque te equivocaste tipeando en el login)
    const isLogin = error.config?.url?.includes('/auth/login');
    if (error.response?.status === 401 && !isLogin && getToken()) {
      clearToken(); // Destruye el token muerto
      window.location.replace('/login'); // Expulsa al usuario al login
    }
    return Promise.reject(error);
  }
);

export default api;