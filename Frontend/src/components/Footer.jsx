import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaArrowRight } from 'react-icons/fa';

import logo from '../assets/images/neon.png'; 

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Orbitron:wght@500;700;900&display=swap');
      `}</style>

      {/* Fondo negro  */}
      <footer className="relative z-20 bg-[#050508] border-t border-white/5 pt-16 pb-8 text-gray-400 font-['Rajdhani'] selection:bg-cyan-400 selection:text-black">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 border-b border-white/5 pb-12">
            
            
            <div>
              <Link to="/" className="flex items-center mb-2 hover:opacity-80 transition-opacity">
                <img 
                  src={logo} 
                  alt="Neon Flex Premium Logo" 
                  className=" sm:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.15)]" 
                />
              </Link>
            </div>
            
            {/* Formulario de Suscripción */}
            <div className="w-full md:w-auto">
              <p className="text-white font-['Orbitron'] font-bold uppercase tracking-[0.2em] text-xs mb-3">Enterate de nuevos diseños</p>
              <div className="flex relative w-full md:w-96 group">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-l-sm py-3.5 px-4 text-white focus:outline-none focus:border-cyan-400/50 transition-colors placeholder:text-gray-600 text-sm font-medium" 
                />
                <button className="bg-cyan-500/10 border border-cyan-500/20 border-l-0 text-cyan-400 px-6 rounded-r-sm font-bold hover:bg-cyan-500 hover:text-[#050508] transition-all flex items-center justify-center group-hover:border-cyan-400/50">
                  <FaArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            
            {/* Info y Redes */}
            <div className="md:col-span-1">
              <p className="text-sm leading-relaxed mb-6 font-medium text-gray-400">
                Transformamos espacios con cartelería LED personalizada de alta gama. Diseño y fabricación propia con materiales 100% importados.
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://www.instagram.com/neonflexpremium/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-sm bg-[#0a0a0f] border border-white/10 flex items-center justify-center text-gray-400 hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
                >
                  <FaInstagram size={18} />
                </a>
                <a 
                  href="https://wa.me/5491164477337" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-sm bg-[#0a0a0f] border border-white/10 flex items-center justify-center text-gray-400 hover:border-[#43e77d]/50 hover:text-[#43e77d] hover:shadow-[0_0_15px_rgba(67,231,125,0.2)] transition-all"
                >
                  <FaWhatsapp size={18} />
                </a>
              </div>
            </div>

            {/* Columna Tienda */}
            <div>
              <h3 className="text-cyan-400 font-['Orbitron'] font-bold uppercase tracking-[0.2em] text-[10px] mb-6">Tienda</h3>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                <li><Link to="/productos" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>Ver Catálogo</Link></li>
                <li><Link to="/presupuesto" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>Cotizador Online</Link></li>
                <li><Link to="/nosotros" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>Nuestro Taller</Link></li>
              </ul>
            </div>

            {/* Columna Ayuda */}
            <div>
              <h3 className="text-cyan-400 font-['Orbitron'] font-bold uppercase tracking-[0.2em] text-[10px] mb-6">Ayuda</h3>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Envíos y Entregas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Garantía Escrita</a></li>
              </ul>
            </div>

            {/* Columna Contacto */}
            <div>
              <h3 className="text-cyan-400 font-['Orbitron'] font-bold uppercase tracking-[0.2em] text-[10px] mb-6">Contacto</h3>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                <li className="flex items-start gap-3 group">
                  <FaMapMarkerAlt className="mt-0.5 text-gray-500 group-hover:text-cyan-400 transition-colors" size={14} />
                  <span>Adrogué, Buenos Aires<br/><span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Argentina</span></span>
                </li>
                <li className="flex items-center gap-3 group">
                  <FaWhatsapp className="text-gray-500 group-hover:text-[#43e77d] transition-colors" size={14} />
                  <span className="group-hover:text-white transition-colors">+54 9 11 6447-7337</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <FaEnvelope className="text-gray-500 group-hover:text-cyan-400 transition-colors" size={14} />
                  <span className="normal-case tracking-normal font-medium text-sm group-hover:text-white transition-colors">ventas@neonflex.com.ar</span>
                </li>
              </ul>
            </div>
          </div>

          {/*  FILA INFERIOR: Copyright y Admin  */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
            <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} NeonFlexPremium. Todos los derechos reservados.</p>
            <p className="mb-4 md:mb-0">Desarrollado por Leandro Jerez & Faustina Retamar[cite: 7]</p>
            <div className="flex gap-6">
              <Link to="/admin" className="hover:text-cyan-400 transition-colors">Acceso Interno</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;