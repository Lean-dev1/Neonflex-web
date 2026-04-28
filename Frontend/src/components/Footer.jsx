import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-gray-200 dark:border-neutral-900 pt-16 pb-8 text-gray-600 dark:text-neutral-400 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">

        {/* --- FILA SUPERIOR: Marca y Newsletter --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 border-b border-gray-200 dark:border-neutral-800 pb-12">
           <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-widest uppercase mb-2 hover:scale-105 transition-transform inline-block">
                Neon<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600 dark:from-neon-blue dark:to-neon-red">Flex</span>
              </h2>
              <p className="font-bold text-gray-500 dark:text-neutral-500 uppercase tracking-widest text-sm">
                Fabricantes de Neón Premium
              </p>
           </div>
           
           {/* Formulario de Suscripción (Da muchísima presencia de marca) */}
           <div className="w-full md:w-auto">
              <p className="text-gray-900 dark:text-white font-bold uppercase tracking-widest text-sm mb-3">Enterate de nuevos diseños</p>
              <div className="flex relative w-full md:w-96 shadow-sm">
                 <input 
                    type="email" 
                    placeholder="Tu correo electrónico" 
                    className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-l-lg py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-neon-blue transition-colors placeholder:text-gray-400 dark:placeholder:text-neutral-600" 
                 />
                 <button className="bg-gray-900 dark:bg-white text-white dark:text-neutral-900 px-6 rounded-r-lg font-black hover:bg-blue-700 dark:hover:bg-neon-blue dark:hover:text-white transition-colors flex items-center justify-center">
                    <FaArrowRight />
                 </button>
              </div>
           </div>
        </div>

        {/* --- FILA CENTRAL: Enlaces y Contacto --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          
          {/* Info y Redes */}
          <div className="md:col-span-1">
            <p className="text-sm leading-relaxed mb-6 font-medium">
              Transformamos espacios con cartelería LED personalizada de alta gama. Diseño y fabricación propia con materiales 100% importados.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/neonflexpremium/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-neutral-900 flex items-center justify-center text-gray-600 dark:text-neutral-400 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-sm">
                <FaInstagram size={20} />
              </a>
              <a href="https://wa.me/5491164477337" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-neutral-900 flex items-center justify-center text-gray-600 dark:text-neutral-400 hover:bg-green-500 hover:text-white dark:hover:bg-green-500 dark:hover:text-white transition-all shadow-sm">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Columna Tienda */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-sm mb-6">Tienda</h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/productos" className="hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Ver Catálogo</Link></li>
              <li><Link to="/presupuesto" className="hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Cotizador Online</Link></li>
              <li><Link to="/nosotros" className="hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Nuestro Taller</Link></li>
            </ul>
          </div>

          {/* Columna Ayuda (Validadores de confianza) */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-sm mb-6">Ayuda</h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Envíos y Entregas</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Garantía Escrita</a></li>
            </ul>
          </div>

          {/* Columna Contacto */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-sm mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm font-bold">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-gray-400 dark:text-neutral-500" />
                <span>Adrogué, Buenos Aires<br/><span className="text-xs text-gray-400 font-normal">Argentina</span></span>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-gray-400 dark:text-neutral-500" />
                <span>+54 9 11 6447-7337</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-gray-400 dark:text-neutral-500" />
                <span>ventas@neonflex.com.ar</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- FILA INFERIOR: Copyright y Admin --- */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 dark:border-neutral-900 pt-8 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-600">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Neon Flex. Todos los derechos reservados.</p>
          <div className="flex gap-6">
             {/* Link de admin camuflado de forma elegante */}
            <Link to="/admin" className="hover:text-gray-900 dark:hover:text-white transition-colors">Acceso Interno</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;