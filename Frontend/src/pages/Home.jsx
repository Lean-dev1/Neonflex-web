import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { FaBolt, FaWhatsapp, FaTruck, FaCreditCard, FaCheckCircle, FaFire, FaRegLightbulb, FaPalette, FaTools } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';

import video1 from '../assets/videos/hero1.mp4';
import video2 from '../assets/videos/hero2.mp4';
import video3 from '../assets/videos/hero3.mp4';

const Home = () => {
  const [products, setProducts] = useState([]);
  const videos = [video1, video2, video3];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      // Filtramos solo Portfolio para el Home
      const trabajosRealizados = res.data.filter(p => p.category === 'portfolio').slice(0, 3);
      setProducts(trabajosRealizados); 
    } catch (error) {
      console.error("Error cargando productos");
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const colores = [
    { nombre: 'Rojo Fuego', hex: '#FF0000', glow: '0 0 15px #FF0000' },
    { nombre: 'Azul Eléctrico', hex: '#0066FF', glow: '0 0 15px #0066FF' },
    { nombre: 'Blanco Frío', hex: '#E0F7FA', glow: '0 0 10px #E0F7FA' },
    { nombre: 'Blanco Cálido', hex: '#FFF3E0', glow: '0 0 10px #FFF3E0' },
    { nombre: 'Amarillo', hex: '#FFEB3B', glow: '0 0 10px #FFEB3B' },
    { nombre: 'Naranja', hex: '#FF9800', glow: '0 0 10px #FF9800' },
    { nombre: 'Rosa', hex: '#E91E63', glow: '0 0 10px #E91E63' },
    { nombre: 'Violeta', hex: '#9C27B0', glow: '0 0 10px #9C27B0' },
    { nombre: 'Celeste', hex: '#03A9F4', glow: '0 0 10px #03A9F4' },
    { nombre: 'Verde', hex: '#4CAF50', glow: '0 0 10px #4CAF50' },
  ];

  return (
    <div className="bg-neutral-950 text-white font-sans">
      
      {/* HERO SECTION */}
      <div className="relative h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-transparent to-red-950/40 z-1 mix-blend-overlay"></div>
        <video 
          key={currentVideoIndex} 
          autoPlay muted playsInline 
          onEnded={handleVideoEnd} 
          className="absolute inset-0 w-full h-full object-cover z-0 brightness-50 contrast-125"
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>
        <div className="relative z-10 max-w-5xl animate-fade-in-up">
          <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-neutral-900/80 border border-neon-red text-neon-red text-sm font-bold mb-6 backdrop-blur-md uppercase tracking-wider shadow-[0_0_15px_rgba(255,23,68,0.3)]">
             <FaFire /> Iluminación LED Premium
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-6 text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] leading-tight">
            TUS IDEAS <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-red drop-shadow-[0_0_10px_rgba(255,23,68,0.5)]">
              IMPACTAN MÁS
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-200 mb-10 font-light max-w-2xl mx-auto">
            Carteles de neón personalizados. La fusión perfecta entre el <span className="text-neon-blue font-bold">azul eléctrico</span> y el <span className="text-neon-red font-bold">rojo intenso</span>.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link to="/presupuesto" className="w-full md:w-auto bg-neon-red hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,23,68,0.5)] flex items-center justify-center gap-2">
              <FaWhatsapp className="text-2xl" /> Pedir Presupuesto
            </Link>
            <Link to="/productos" className="w-full md:w-auto bg-transparent border-2 border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:text-white hover:border-white font-bold py-4 px-10 rounded-full transition-all backdrop-blur-sm">
              Ver Diseños
            </Link>
          </div>
        </div>
      </div>

      {/* INSIGNIAS (Barra Negra) */}
      <div className="bg-black py-10 border-b border-neutral-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
          <div className="flex flex-col items-center gap-3 p-2">
            <FaTruck className="text-5xl text-neon-blue mb-2 drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
            <h3 className="font-bold text-xl text-white">Envíos a todo el país</h3>
            <p className="text-sm text-neutral-400">Despachamos por Correo o Encomienda</p>
          </div>
          <div className="flex flex-col items-center gap-3 p-2">
            <FaCreditCard className="text-5xl text-neon-red mb-2 drop-shadow-[0_0_10px_rgba(255,23,68,0.5)]" />
            <h3 className="font-bold text-xl text-white">Pagá como quieras</h3>
            <p className="text-sm text-neutral-400">Transferencia, Efectivo o Tarjetas</p>
          </div>
          <div className="flex flex-col items-center gap-3 p-2">
            <FaCheckCircle className="text-5xl text-white mb-2" />
            <h3 className="font-bold text-xl text-white">Calidad Garantizada</h3>
            <p className="text-sm text-neutral-400">Tecnología LED de larga duración</p>
          </div>
        </div>
      </div>

      {/* CÓMO FUNCIONA */}
      <div className="py-24 px-4 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-20 tracking-tight">
            ¿CÓMO TENER TU <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-red">NEON</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-14 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-purple-900 to-neon-red -z-0 opacity-20"></div>
            {/* Pasos (Usando neutral-900 para las cajas) */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-28 h-28 bg-neutral-900 rounded-2xl rotate-3 flex items-center justify-center border-2 border-neutral-800 shadow-xl mb-8 group-hover:border-neon-blue group-hover:rotate-6 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <FaRegLightbulb className="text-5xl text-neon-blue -rotate-3 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-3">1. Tu Idea</h3>
              <p className="text-neutral-400 px-4 leading-relaxed">Contanos tu frase, logo o dibujo y las medidas. ¡Nosotros lo imaginamos en luz!</p>
            </div>
            {/* ... (Repetir patrón para los otros pasos) ... */}
             <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-28 h-28 bg-neutral-900 rounded-2xl -rotate-3 flex items-center justify-center border-2 border-neutral-800 shadow-xl mb-8 group-hover:border-neon-red group-hover:-rotate-6 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,23,68,0.3)]">
                <FaPalette className="text-5xl text-neon-red rotate-3 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-3">2. Diseño</h3>
              <p className="text-neutral-400 px-4 leading-relaxed">Te pasamos el presupuesto y un boceto digital para que veas cómo queda.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center group mt-8 md:mt-0">
              <div className="w-28 h-28 bg-neutral-900 rounded-2xl rotate-3 flex items-center justify-center border-2 border-neutral-800 shadow-xl mb-8 group-hover:border-white group-hover:rotate-6 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                <FaTools className="text-5xl text-white -rotate-3 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-3">3. Fabricación</h3>
              <p className="text-neutral-400 px-4 leading-relaxed">Con el 50% de seña, nuestros artesanos comienzan a crear tu cartel.</p>
            </div>
             <div className="relative z-10 flex flex-col items-center text-center group mt-8 md:mt-0">
              <div className="w-28 h-28 bg-neutral-900 rounded-2xl -rotate-3 flex items-center justify-center border-2 border-neutral-800 shadow-xl mb-8 group-hover:border-neon-red group-hover:-rotate-6 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,23,68,0.3)]">
                <FaTruck className="text-5xl text-neon-red rotate-3 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-3">4. Entrega</h3>
              <p className="text-neutral-400 px-4 leading-relaxed">Te enviamos foto y video del resultado final. Abonás el resto y despachamos.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PALETA DE COLORES */}
      <div className="py-24 bg-neutral-900/30 relative border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <h2 className="text-4xl font-black mb-8">Nuestros Colores <span className="text-neon-red underline decoration-neon-blue">Vibrantes</span></h2>
            <p className="text-neutral-300 mb-10 text-lg">Usamos la mejor tecnología de neón LED. Colores que no se apagan.</p>
            <div className="grid grid-cols-5 gap-6">
              {colores.map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="w-14 h-14 rounded-full border-4 border-neutral-800 transition-all duration-300 group-hover:scale-110 group-hover:border-white" style={{ backgroundColor: c.hex, boxShadow: c.glow }}></div>
                  <span className="text-[11px] uppercase font-bold text-neutral-500 group-hover:text-white transition-colors text-center">{c.nombre}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-neutral-900/80 p-10 rounded-3xl border border-neutral-800 shadow-2xl relative overflow-hidden backdrop-blur-xl">
             <div className="absolute top-0 right-0 w-40 h-40 bg-neon-blue/10 rounded-full blur-[100px] -z-10"></div>
             <h3 className="text-3xl font-bold mb-8 flex items-center gap-3"><BiSupport className="text-neon-blue" /> Calidad Técnica</h3>
             <ul className="space-y-6">
               <li className="flex items-start gap-4">
                 <FaCheckCircle className="text-neon-blue mt-1 text-xl" />
                 <div><strong className="block text-white text-lg mb-1">Base de Acrílico Importado</strong><span className="text-neutral-400 leading-relaxed">Transparente de 4mm, corte láser.</span></div>
               </li>
               <li className="flex items-start gap-4">
                 <FaCheckCircle className="text-neon-red mt-1 text-xl" />
                 <div><strong className="block text-white text-lg mb-1">12 Voltios (Seguro)</strong><span className="text-neutral-400 leading-relaxed">Incluye fuente. No levanta temperatura.</span></div>
               </li>
               <li className="flex items-start gap-4">
                 <FaCheckCircle className="text-white mt-1 text-xl" />
                 <div><strong className="block text-white text-lg mb-1">Listo para Colgar</strong><span className="text-neutral-400 leading-relaxed">Incluye kit de instalación completo.</span></div>
               </li>
             </ul>
          </div>
        </div>
      </div>

      {/* PORTAFOLIO */}
      <div className="max-w-7xl mx-auto py-24 px-4">
        <div className="text-center mb-16 relative">
            <h2 className="text-4xl font-black inline-flex items-center gap-3 z-10 relative">
            <FaBolt className="text-neon-blue"/> Trabajos Realizados <FaBolt className="text-neon-red"/>
            </h2>
            <div className="absolute w-1/2 h-1 bg-gradient-to-r from-transparent via-neutral-800 to-transparent bottom-0 left-1/4 -mb-4"></div>
            <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">Proyectos personalizados para nuestros clientes.</p>
        </div>

        {products.length === 0 ? (
           <p className="text-center text-neutral-600 py-10 text-xl">Cargando portafolio... 🎨</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {products.map((prod) => (
              <div key={prod.id} className="bg-neutral-900 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all group border border-neutral-800 hover:border-neon-blue/50 flex flex-col">
                <div className="h-72 overflow-hidden relative">
                   <img src={prod.image_url} alt={prod.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-2 capitalize text-white group-hover:text-neon-blue transition-colors">{prod.title}</h3>
                  <p className="text-neutral-400 text-sm mb-6 line-clamp-3 flex-grow">
                    {prod.description || 'Diseño personalizado a medida con base acrílica.'}
                  </p>
                  <div className="mt-auto pt-6 border-t border-neutral-800">
                      <Link to="/presupuesto" className="w-full bg-neutral-800 hover:bg-neon-blue hover:text-neutral-900 text-white border border-neutral-600 hover:border-neon-blue px-6 py-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] uppercase tracking-wider">
                        <FaWhatsapp className="text-lg" /> Quiero algo así
                      </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-12">
            <Link to="/productos" className="inline-block border-b border-neon-red text-neutral-500 hover:text-white transition-colors pb-1 text-sm font-bold uppercase tracking-widest hover:border-white">
                Ver productos en stock →
            </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;