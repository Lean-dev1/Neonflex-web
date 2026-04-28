import { useState, useEffect } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

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

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && isAtTop;

  return (
    <Disclosure 
      as="nav" 
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isTransparent 
          ? 'bg-transparent border-transparent py-2' 
          // ACÁ ESTÁ LA MAGIA: Cuando no es transparente, SIEMPRE es negra/neutral-950
          : 'bg-neutral-950/95 backdrop-blur-lg border-b border-neutral-900 py-0 shadow-xl'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          <div className="flex flex-1 justify-start items-center">
            <Link to="/" className="hover:scale-105 transition-transform">
              <img 
                src={logoNeon} 
                alt="Neon Flex Premium" 
                className="h-16 w-auto object-contain" 
              />
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {navigation.map((item) => {
               const isCurrent = location.pathname === item.href;
               return (
                <Link
                  key={item.name}
                  to={item.href}
                  // Como el fondo es siempre oscuro, el texto SIEMPRE es blanco
                  className={`relative text-xs lg:text-sm font-bold uppercase tracking-widest group py-2 transition-colors ${
                    isCurrent ? 'text-neon-blue' : 'text-white hover:text-gray-300'
                  }`}
                >
                  {item.name}
                  <span 
                    className={`absolute left-0 bottom-0 h-[2px] bg-neon-blue transition-all duration-300 ease-out ${
                      isCurrent ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-1 justify-end items-center gap-3 lg:gap-5">
            <a 
              href="https://wa.me/5491164477337?text=Hola! Estaba viendo la web y quiero hacer una consulta..." 
              target="_blank" 
              rel="noreferrer"
              className="hidden lg:flex items-center gap-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            >
              <FaWhatsapp size={18} />
              Contáctanos
            </a>

            {/* Íconos siempre en blanco para contrastar con el fondo oscuro */}
            <button
              onClick={toggleDarkMode}
              className="relative rounded-full p-2 text-white hover:text-neon-blue focus:outline-none transition-all hover:scale-110"
              title="Cambiar tema"
            >
              {isDarkMode ? <SunIcon className="size-6" /> : <MoonIcon className="size-6" />}
            </button>

            <div className="flex items-center md:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:text-neon-blue focus:outline-none">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Abrir menú</span>
                <Bars3Icon aria-hidden="true" className="block size-8 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-8 group-data-[open]:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>
      </div>

      {/* Menú Móvil - Este también lo dejamos siempre con fondo oscuro para mantener la coherencia */}
      <DisclosurePanel className="md:hidden bg-neutral-950/95 backdrop-blur-2xl border-t border-neutral-900 absolute w-full shadow-2xl">
        <div className="space-y-1 px-4 pb-4 pt-4">
          {navigation.map((item) => {
            const isCurrent = location.pathname === item.href;
            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                className={`block px-4 py-4 text-sm font-bold uppercase tracking-widest transition-all rounded-lg ${
                  isCurrent 
                    ? 'text-neon-blue bg-neutral-900' 
                    : 'text-gray-300 hover:bg-neutral-900 hover:text-neon-blue'
                }`}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
        <div className="px-4 pb-6 pt-2">
           <a 
              href="https://wa.me/5491164477337?text=Hola! Estaba viendo la web y quiero hacer una consulta..." 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-500 text-white px-4 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg shadow-green-500/30 hover:bg-green-400 transition-colors"
            >
              <FaWhatsapp size={20} />
              Contáctanos
            </a>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}