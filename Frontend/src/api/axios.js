import axios from 'axios';

const api = axios.create({
  // En Vite, las variables de entorno usan import.meta.env en lugar de process.env
  // Si no hay variable (producción), usa localhost por defecto (desarrollo)
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', 
});

// Interceptor: Se ejecuta mágicamente ANTES de cada petición (GET, POST, PUT, DELETE)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    // Si el usuario está logueado, le inyectamos la llave maestra a la petición
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;