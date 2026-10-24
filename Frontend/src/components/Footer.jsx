import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaArrowRight, 
  FaTruck, 
  FaMoneyBillWave,
  FaCheck
} from 'react-icons/fa';

import logo from '../assets/images/neon.png';

const waLink = "https://wa.me/5491164477337";
const igLink = "https://www.instagram.com/neonflexpremium/";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Orbitron:wght@500;700;900&display=swap');
      `}</style>

      <footer className="relative z-20 bg-[#050508] border-t border-white/10 pt-14 pb-8 text-gray-400 font-['Rajdhani'] selection:bg-cyan-400 selection:text-black">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">

          {/* 1. CABECERA DEL FOOTER: Logo + Suscripción */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-14 border-b border-white/10 pb-10">
            <div>
              <Link to="/" className="inline-flex items-center mb-2 hover:opacity-85 transition-opacity">
                <img 
                  src={logo} 
                  alt="NeonFlex Premium" 
                  className="h-11 sm:h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.15)]" 
                />
              </Link>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">
                Cartelería LED & Letras Corpóreas a Medida
              </p>
            </div>
            
            {/* Formulario de Suscripción Funcional */}
            <form onSubmit={handleSubscribe} className="w-full md:w-auto">
              <label htmlFor="footer-newsletter" className="block text-white font-['Orbitron'] font-bold uppercase tracking-[0.2em] text-xs mb-3">
                Enterate de nuevos diseños
              </label>
              <div className="flex relative w-full md:w-96 group">
                <input 
                  id="footer-newsletter"
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico" 
                  className="w-full bg-[#0a0a0f] border border-white/15 rounded-l-sm py-3 px-4 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-gray-600 text-sm font-medium" 
                />
                <button 
                  type="submit"
                  aria-label="Suscribirme"
                  className="bg-cyan-500/15 border border-cyan-400/40 border-l-0 text-cyan-400 px-5 rounded-r-sm font-['Orbitron'] text-xs font-bold hover:bg-cyan-500 hover:text-[#050508] transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  {subscribed ? (
                    <>
                      <FaCheck size={12} /> <span className="hidden sm:inline">LISTO</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">UNIRME</span> <FaArrowRight size={12} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* 2. GRILLA DE 4 COLUMNAS (Estructura Figma + Colores Cyberpunk) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.1fr_1.3fr] gap-10 mb-14">
            
            {/* Columna 1: Sobre el Taller y Redes */}
            <div>
              <p className="text-sm leading-relaxed mb-6 font-medium text-gray-400">
                Carteles de neón flex LED y letras corpóreas hechos a medida en nuestro taller. Diseño propio con materiales 100% importados.
              </p>
              <div className="flex items-center gap-3">
                <a 
                  href={igLink}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram de NeonFlex Premium"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-[#0a0a0f] border border-white/10 text-xs font-['Orbitron'] font-bold uppercase tracking-wider text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
                >
                  <FaInstagram size={16} /> Instagram
                </a>
                <a 
                  href={waLink}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="WhatsApp de NeonFlex Premium"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-[#0a0a0f] border border-white/10 text-xs font-['Orbitron'] font-bold uppercase tracking-wider text-gray-300 hover:border-[#43e77d]/50 hover:text-[#43e77d] hover:shadow-[0_0_15px_rgba(67,231,125,0.2)] transition-all"
                >
                  <FaWhatsapp size={16} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Columna 2: Tienda */}
            <div>
              <h3 className="text-cyan-400 font-['Orbitron'] font-bold uppercase tracking-[0.2em] text-[11px] mb-5">
                Tienda
              </h3>
              <ul className="space-y-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                <li>
                  <Link to="/productos" className="hover:text-cyan-400 transition-colors">
                    Catálogo Completo
                  </Link>
                </li>
                <li>
                  <Link to="/productos?categoria=frases" className="hover:text-cyan-400 transition-colors">
                    Textos y Frases
                  </Link>
                </li>
                <li>
                  <Link to="/productos?categoria=figuras" className="hover:text-cyan-400 transition-colors">
                    Figuras
                  </Link>
                </li>
                <li>
                  <Link to="/productos?categoria=negocios" className="hover:text-cyan-400 transition-colors">
                    Logos para Negocios
                  </Link>
                </li>
                <li>
                  <Link to="/presupuesto" className="hover:text-cyan-400 transition-colors">
                    Cotizador a Medida
                  </Link>
                </li>
                <li>
                  <Link to="/nosotros" className="hover:text-cyan-400 transition-colors">
                    Nosotros
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 3: Ayuda */}
            <div>
              <h3 className="text-cyan-400 font-['Orbitron'] font-bold uppercase tracking-[0.2em] text-[11px] mb-5">
                Ayuda
              </h3>
              <ul className="space-y-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                <li>
                  <Link to="/nosotros" className="hover:text-cyan-400 transition-colors">
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <a href={`${waLink}?text=Hola! Quiero consultar sobre los envíos a domicilio.`} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                    Envíos y Entregas a todo el pais
                  </a>
                </li>
                <li>
                  <a href={`${waLink}?text=Hola! Quiero consultar sobre la garantía de 6 meses.`} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                    Garantía Escrita 
                  </a>
                </li>
                <li>
                  <Link to="/terminos" className="hover:text-cyan-400 transition-colors">
                    Términos y Condiciones
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 4: Contacto */}
            <div>
              <h3 className="text-cyan-400 font-['Orbitron'] font-bold uppercase tracking-[0.2em] text-[11px] mb-5">
                Contacto
              </h3>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                <li className="flex items-start gap-3 group">
                  <FaMapMarkerAlt className="mt-0.5 text-cyan-400 shrink-0" size={14} />
                  <span>
                    Adrogué, Buenos Aires<br/>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Argentina</span>
                  </span>
                </li>
                <li>
                  <a href="tel:+5491164477337" className="flex items-center gap-3 group hover:text-white transition-colors">
                    <FaWhatsapp className="text-[#43e77d] shrink-0" size={15} />
                    <span>+54 9 11 6447-7337</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:ventas@neonflex.com.ar" className="flex items-center gap-3 group hover:text-white transition-colors">
                    <FaEnvelope className="text-cyan-400 shrink-0" size={14} />
                    <span className="normal-case tracking-normal font-medium text-sm">neonflexpremium08@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 3. BARRA DE MEDIOS DE ENVÍO, PAGOS Y LEGALES (Del diseño de Figma) */}
          <div className="border-t border-white/10 py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-gray-400">
            <div className="flex flex-wrap items-center gap-6">
              <span className="inline-flex items-center gap-2 font-semibold">
                <FaTruck className="text-cyan-400" size={14} />
                Envíos: <strong className="text-white">Correo Argentino</strong>
              </span>
              <span className="inline-flex items-center gap-2 font-semibold">
                <FaMoneyBillWave className="text-cyan-400" size={14} />
                Pagos: <strong className="text-white">Efectivo y Transferencia</strong>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs font-semibold">
              <a 
                href={`${waLink}?text=Hola! Solicito gestionar el botón de arrepentimiento de mi compra.`} 
                target="_blank" 
                rel="noreferrer" 
                className="text-cyan-400 hover:underline"
              >
                Botón de arrepentimiento
              </a>
              <a 
                href="https://www.argentina.gob.ar/produccion/defensadelconsumidor" 
                target="_blank" 
                rel="noreferrer" 
                className="text-cyan-400 hover:underline"
              >
                Defensa del consumidor
              </a>
            </div>
          </div>

          {/* 4. FILA INFERIOR: Copyright, Créditos y Acceso Admin */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 gap-4">
            <p>&copy; {new Date().getFullYear()} NeonFlex Premium. Todos los derechos reservados.</p>
            <p>Desarrollado por Leandro Jerez y Faustina Retamar</p>
            <div className="flex gap-6">
              <Link to="/admin" className="hover:text-cyan-400 transition-colors">
                Acceso Interno
              </Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;