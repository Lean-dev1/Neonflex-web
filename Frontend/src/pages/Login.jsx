import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaUser, FaArrowLeft } from 'react-icons/fa';

const Login = () => {
  
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Orbitron:wght@700;900&display=swap');
      `}</style>
      
      <div className="min-h-screen flex items-center justify-center bg-[#050508] px-4 font-['Rajdhani'] relative overflow-hidden">
        
        {/* Elementos decorativos sutiles de fondo */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="bg-[#0a0a0f] p-8 md:p-10 rounded-sm shadow-2xl border border-white/10 w-full max-w-md relative z-10">
          
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-1 font-['Orbitron'] mb-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl font-black text-white tracking-widest">NEON</span>
              <span className="text-2xl font-black text-cyan-400 tracking-widest">FLEX</span>
            </Link>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mt-1">
              Acceso Restringido
            </h2>
          </div>
          
          {/* Mensaje de Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-sm mb-6 text-center text-xs font-bold uppercase tracking-wider">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FaUser className="absolute top-1/2 -translate-y-1/2 left-4 text-cyan-400/50" />
              <input 
                type="text" 
                name="username" 
                placeholder="Usuario" 
                onChange={handleChange}
                className="w-full bg-[#1a1a22] border border-white/5 rounded-sm py-3.5 pl-12 pr-4 text-white text-sm focus:border-cyan-400/50 focus:outline-none transition-colors placeholder:text-gray-600 font-medium tracking-wide"
                required
              />
            </div>
            
            <div className="relative">
              <FaLock className="absolute top-1/2 -translate-y-1/2 left-4 text-cyan-400/50" />
              <input 
                type="password" 
                name="password" 
                placeholder="Contraseña" 
                onChange={handleChange}
                className="w-full bg-[#1a1a22] border border-white/5 rounded-sm py-3.5 pl-12 pr-4 text-white text-sm focus:border-cyan-400/50 focus:outline-none transition-colors placeholder:text-gray-600 font-medium tracking-wide"
                required
              />
            </div>
            
            <button className="w-full bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500 hover:text-[#050508] text-cyan-400 font-bold py-3.5 mt-2 rounded-sm transition-all uppercase tracking-widest text-sm flex items-center justify-center">
              Ingresar al panel
            </button>
          </form>

          {/* Enlace para volver a la tienda */}
          <div className="mt-8 text-center">
            <Link to="/" className="text-gray-500 hover:text-cyan-400 text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2">
              <FaArrowLeft size={10} /> Volver a la tienda
            </Link>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Login;