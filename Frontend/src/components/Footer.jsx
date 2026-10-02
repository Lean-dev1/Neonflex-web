import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@700;900&display=swap');
      `}</style>

      <footer className="bg-[#050508] border-t border-white/10 pt-16 pb-8 text-gray-400 font-['Rajdhani']">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* --- FILA SUPERIOR: Marca y Newsletter --- */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 border-b border-white/10 pb-12">
            <div>
              <Link to="/" className="flex items-center gap-1 font-['Orbitron'] mb-2 hover:opacity-80 transition-opacity inline-flex">
                <span className="text-3xl font-black text-white tracking-widest">Neon</span>
                <span className="text-3xl font-black text-cyan-400 tracking-widest">FlexPremium </span>
              </Link>
            </div>
            
            {/* Formulario de Suscripción */}
            <div className="w-full md:w-auto">
              <p className="text-white font-bold uppercase tracking-[0.15em] text-sm mb-3">Enterate de nuevos diseños</p>
              <div className="flex relative w-full md:w-96">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="w-full bg-white/5 border border-white/10 rounded-l-sm py-3 px-4 text-white focus:outline-none focus:border-cyan-400/50 transition-colors placeholder:text-gray-600 text-sm" 
                />
                <button className="bg-cyan-500/10 border border-cyan-500/20 border-l-0 text-cyan-400 px-6 rounded-r-sm font-bold hover:bg-cyan-500 hover:text-[#050508] transition-colors flex items-center justify-center">
                  <FaArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* --- FILA CENTRAL: Enlaces y Contacto --- */}
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
                  className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <FaInstagram size={18} />
                </a>
                <a 
                  href="https://wa.me/5491164477337" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:border-green-500/50 hover:text-green-500 transition-colors"
                >
                  <FaWhatsapp size={18} />
                </a>
              </div>
            </div>

            {/* Columna Tienda */}
            <div>
              <h3 className="text-white font-bold uppercase tracking-[0.15em] text-sm mb-6">Tienda</h3>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-gray-400">
                <li><Link to="/productos" className="hover:text-cyan-400 transition-colors">Ver Catálogo</Link></li>
                <li><Link to="/presupuesto" className="hover:text-cyan-400 transition-colors">Cotizador Online</Link></li>
                <li><Link to="/nosotros" className="hover:text-cyan-400 transition-colors">Nuestro Taller</Link></li>
              </ul>
            </div>

            {/* Columna Ayuda */}
            <div>
              <h3 className="text-white font-bold uppercase tracking-[0.15em] text-sm mb-6">Ayuda</h3>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Preguntas Frecuentes</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Envíos y Entregas</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Garantía Escrita</a></li>
              </ul>
            </div>

            {/* Columna Contacto */}
            <div>
              <h3 className="text-white font-bold uppercase tracking-[0.15em] text-sm mb-6">Contacto</h3>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-gray-400">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-0.5 text-gray-500" size={14} />
                  <span>Adrogué, Buenos Aires<br/><span className="text-xs text-gray-600 font-normal normal-case tracking-normal">Argentina</span></span>
                </li>
                <li className="flex items-center gap-3">
                  <FaWhatsapp className="text-gray-500" size={14} />
                  <span>+54 9 11 6447-7337</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-500" size={14} />
                  <span className="normal-case tracking-normal">ventas@neonflex.com.ar</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- FILA INFERIOR: Copyright y Admin --- */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-xs font-bold uppercase tracking-widest text-gray-600">
            <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} NeonFlexPremium. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <Link to="/admin" className="hover:text-gray-400 transition-colors">Acceso Interno</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;