import { useState, useEffect } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'

import logoNeon from '../assets/images/neon.png'; 

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Productos', href: '/productos' },
  { name: 'Presupuesto', href: '/presupuesto' },
  { name: 'Nosotros', href: '/nosotros' },
]

export default function Navbar() {
  const location = useLocation(); 
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  // Manejo del scroll para ocultar/mostrar la barra y detectar si está arriba
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsAtTop(currentScrollY < 60);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Forzamos el modo oscuro por defecto
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  }, []);

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && isAtTop;

  return (
    <>
      {/* Importamos la misma fuente que en Productos */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Orbitron:wght@700;900&display=swap');
      `}</style>

      <Disclosure 
        as="nav" 
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out font-['Rajdhani'] ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isTransparent 
            ? 'bg-transparent border-transparent py-2' 
            : 'bg-[#050508]/95 backdrop-blur-lg border-b border-white/10 py-0 shadow-xl'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            
            {/* LOGO */}
            <div className="flex flex-1 justify-start items-center">
              <Link to="/" className="hover:scale-105 transition-transform">
                <img 
                  src={logoNeon} 
                  alt="Neon Flex Premium" 
                  className="h-16 w-auto object-contain" 
                />
              </Link>
            </div>

            {/* ENLACES CENTRALES */}
            <div className="hidden md:flex flex-1 justify-center space-x-8">
              {navigation.map((item) => {
                 const isCurrent = location.pathname === item.href;
                 return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative text-[14px] lg:text-[15px] font-bold uppercase tracking-[0.15em] group py-2 transition-colors ${
                      isCurrent ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                    <span 
                      className={`absolute left-0 bottom-0 h-[2px] bg-cyan-400 transition-all duration-300 ease-out ${
                        isCurrent ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    ></span>
                  </Link>
                );
              })}
            </div>

            {/* BOTONES DERECHA */}
            <div className="flex flex-1 justify-end items-center gap-3 lg:gap-5">
              
              {/* Botón WhatsApp Desktop */}
              <a 
                href="https://wa.me/5491164477337?text=Hola! Estaba viendo la web y quiero hacer una consulta..." 
                target="_blank" 
                rel="noreferrer"
                className="hidden lg:flex items-center gap-2 border border-green-600/50 text-green-500 hover:text-green-400 hover:border-green-500 px-5 py-2 rounded-sm text-[13px] font-bold uppercase tracking-widest transition-colors"
              >
                <FaWhatsapp size={18} />
                Contáctanos
              </a>

              {/* Botón Hamburguesa Móvil */}
              <div className="flex items-center md:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:outline-none transition-colors">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Abrir menú</span>
                  <Bars3Icon aria-hidden="true" className="block size-8 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-8 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        <DisclosurePanel className="md:hidden bg-[#0a0a0f] border-t border-white/10 absolute w-full shadow-2xl">
          <div className="space-y-1 px-4 pb-4 pt-4">
            {navigation.map((item) => {
              const isCurrent = location.pathname === item.href;
              return (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={`block px-4 py-4 text-sm font-bold uppercase tracking-[0.15em] transition-colors rounded-sm ${
                    isCurrent 
                      ? 'text-cyan-400 bg-white/5' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.name}
                </DisclosureButton>
              );
            })}
          </div>
          <div className="px-4 pb-6 pt-2">
             {/* Botón WhatsApp Móvil (Sin animación exagerada) */}
             <a 
                href="https://wa.me/5491164477337?text=Hola! Estaba viendo la web y quiero hacer una consulta..." 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-green-600/50 text-green-500 hover:border-green-500 hover:text-green-400 px-4 py-3 rounded-sm text-sm font-bold uppercase tracking-widest transition-colors"
              >
                <FaWhatsapp size={20} />
                Contáctanos
              </a>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
  )
}