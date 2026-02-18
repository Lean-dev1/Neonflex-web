import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-12 pb-6 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        
        {/*Detalles del emprendimiento*/}
        <div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple mb-4">
            NeonFlexPremium
          </h2>
          <p className="text-sm mb-4">
            Iluminamos tus ideas. Cartelería LED personalizada y soluciones en impresión 3D para tu negocio u hogar.
          </p>
          <div className="flex gap-4">
            {/*Redes y whatsapp */}
            <a href="https://www.instagram.com/neonflexpremium/" target="_blank" rel="noopener noreferrer" className="hover:text-neon-pink transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="https://wa.me/5491164477337" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>

        {/*Links Rapidos */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">Explorar</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-neon-blue transition-colors">Inicio</Link></li>
            <li><Link to="/productos" className="hover:text-neon-blue transition-colors">Catálogo</Link></li>
            <li><Link to="/presupuesto" className="hover:text-neon-blue transition-colors">Pedir Presupuesto</Link></li>
            <li><Link to="/nosotros" className="hover:text-neon-blue transition-colors">Sobre Nosotros</Link></li>
            <li><Link to="/admin" className="hover:text-gray-200 transition-colors text-xs">Acceso Admin</Link></li>
          </ul>
        </div>

        {/*Contacto */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">Contacto</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-neon-purple" />
              <span>Adrogué, Buenos Aires</span>
            </li>
            <li className="flex items-center gap-2">
              <FaWhatsapp className="text-green-400" />
              <span>+54 9 11 6447-7337</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-neon-blue" />
              <span>contacto@neonflex.com.ar</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-900 pt-6 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Neon Flex. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;