import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { FaBolt } from 'react-icons/fa';

// --- IMPORTA TU VIDEO AQUÍ ---
import heroVideo from '../assets/videos/hero.mp4'; 

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data.slice(0, 3)); 
    } catch (error) {
      console.error("Error cargando productos");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {/* --- SECCIÓN HERO CON VIDEO DE FONDO --- */}
      <div className="relative h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden">
        
        {/* EL VIDEO DE FONDO */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline // Importante para que funcione en iPhone
          className="absolute inset-0 w-full h-full object-cover z-[-1] brightness-50"
        >
          <source src={heroVideo} type="video/mp4" />
          Tu navegador no soporta videos.
        </video>

        {/* --- MÁSCARA DE PUNTOS (Opcional, le da textura pro) --- */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
        
        {/* EL CONTENIDO ENCIMA */}
        <div className="relative z-10 max-w-4xl animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-slate-800/80 border border-neon-blue/50 text-neon-blue text-sm font-bold mb-6 backdrop-blur-md">
             🚀 Novedad: Diseños 2026
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_25px_rgba(120,50,255,0.5)]">
            NEON FLEX PREMIUM
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            Transformamos tus ideas en luz. La combinación perfecta entre artesanía LED e impresión 3D.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link to="/presupuesto" className="w-full md:w-auto bg-neon-pink hover:bg-pink-600 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,170,0.6)] flex items-center justify-center gap-2">
              <FaBolt /> ¡Quiero mi diseño!
            </Link>
            <Link to="/productos" className="w-full md:w-auto bg-slate-900/50 hover:bg-slate-800 border border-white/20 hover:border-neon-blue text-white font-bold py-4 px-10 rounded-full transition-all backdrop-blur-sm">
              Ver Catálogo
            </Link>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN DE DESTACADOS (Sigue igual) --- */}
      <div className="max-w-7xl mx-auto py-20 px-4">
        <div className="flex items-center gap-4 mb-12">
            <div className="h-1 flex-grow bg-slate-800 rounded-full"></div>
            <h2 className="text-3xl font-bold flex items-center gap-2 text-white">
              <FaBolt className="text-neon-blue"/> Lo Último
            </h2>
            <div className="h-1 flex-grow bg-slate-800 rounded-full"></div>
        </div>

        {/* ... (Aquí va el resto de tu código de productos igual que antes) ... */}
        {products.length === 0 ? (
           <p className="text-center text-gray-500 py-10">Cargando destellos... ✨</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((prod) => (
              <div key={prod.id} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-neon-blue transition-all group shadow-lg hover:shadow-neon-blue/10">
                <div className="h-72 overflow-hidden relative">
                   <img src={prod.image_url} alt={prod.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   {/* Overlay degradado al pasar el mouse */}
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-6 relative">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-white group-hover:text-neon-blue transition-colors capitalize">{prod.title}</h3>
                    <span className="bg-green-500/10 text-green-400 text-xs font-bold px-2 py-1 rounded border border-green-500/20">DISPONIBLE</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">{prod.description || 'Diseño exclusivo Neon Flex con base impresa en 3D.'}</p>
                  
                  <div className="flex justify-between items-center border-t border-slate-700/50 pt-4">
                      <span className="text-3xl font-bold text-white">${prod.price}</span>
                      <a 
                        href={`https://wa.me/5491164477337?text=Hola! Me interesa el cartel "${prod.title}" que vi en la web.`}
                        target="_blank"
                        rel="noreferrer" 
                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                        <FaBolt /> Pedir
                      </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;