import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUser } from 'react-icons/fa';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      // Guardamos el token en el navegador
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
          Acceso Admin
        </h2>
        
        {error && <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4 text-center text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute top-4 left-4 text-gray-400" />
            <input 
              type="text" 
              name="username" 
              placeholder="Usuario" 
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-12 text-white focus:border-neon-blue focus:outline-none"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-4 left-4 text-gray-400" />
            <input 
              type="password" 
              name="password" 
              placeholder="Contraseña" 
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-12 text-white focus:border-neon-blue focus:outline-none"
            />
          </div>
          <button className="w-full bg-neon-purple hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-purple-900/50">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;