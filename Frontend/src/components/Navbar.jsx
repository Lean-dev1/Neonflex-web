import { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

import logoNeon from '../assets/images/neon.png';

const announcements = [
  "🚚 Envíos a todo el país",
  "🛡️ Garantía en todos los carteles",
  "⚡ Cotización sin costo: te mandamos el presupuesto en 24hs",
];

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Catálogo', href: '/productos' },
  { name: 'Frases', href: '/productos?categoria=frases' },
  { name: 'Figuras', href: '/productos?categoria=figuras' },
  { name: 'Negocios', href: '/productos?categoria=negocios' },
  { name: 'A medida', href: '/presupuesto' },
  { name: 'Nosotros', href: '/nosotros' },
];

const waLink = "https://wa.me/5491164477337?text=Hola! Estaba viendo la web y quiero hacer una consulta...";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 40);

      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false);
        setMobileSearchOpen(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/productos?buscar=${encodeURIComponent(trimmed)}`);
      setMobileSearchOpen(false);
    } else {
      navigate('/productos');
    }
  };

  const isActiveLink = (href) => {
    if (href === '/') return location.pathname === '/';
    return (location.pathname + location.search) === href;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Orbitron:wght@600;700;900&display=swap');
        
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: flex;
          width: max-content;
          animation: ticker 30s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      <Disclosure
        as="header"
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out font-['Rajdhani'] ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* 1. BARRA DE ANUNCIOS SUPERIOR (Carrusel Deslizante Infinito) */}
        <div className="bg-gradient-to-r from-[#050508] via-[#0c1a24] to-[#050508] border-b border-black-100 text-gray-200 h-9 flex items-center overflow-hidden">
          <div className="animate-ticker">
            {[...announcements, ...announcements].map((item, idx) => (
              <span 
                key={idx} 
                className="flex items-center gap-2 mx-8 md:mx-16 text-[11px] sm:text-xs font-['Orbitron'] tracking-wider uppercase text-white-400 font-bold shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* 2. HEADER PRINCIPAL */}
        <div
          className={`transition-colors duration-300 ${
            isAtTop
              ? 'bg-[#050508]/85 backdrop-blur-md'
              : 'bg-[#050508]/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          } border-b border-white/10`}
        >
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <div className="flex h-20 items-center justify-between gap-4 lg:gap-8">
              
              <div className="flex items-center md:hidden">
                <DisclosureButton className="group inline-flex items-center justify-center gap-1.5 rounded-sm p-2 text-gray-300 hover:text-cyan-400 focus:outline-none transition-colors">
                  <Bars3Icon aria-hidden="true" className="block size-7 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-7 group-data-[open]:block" />
                  <span className="text-xs font-['Orbitron'] font-bold uppercase tracking-wider">Menú</span>
                </DisclosureButton>
              </div>

              <div className="flex items-center shrink-0">
                <Link to="/" className="flex items-center gap-3 group">
                  <img
                    src={logoNeon}
                    alt="NeonFlex Premium"
                    className="h-16 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform"
                  />
                </Link>
              </div>

              <form
                onSubmit={handleSearchSubmit}
                className="hidden md:flex flex-1 max-w-md lg:max-w-lg items-center bg-[#111117] border border-white/15 focus-within:border-cyan-400 focus-within:shadow-[0_0_15px_rgba(0,240,255,0.15)] rounded-sm px-4 h-11 transition-all"
              >
                <label htmlFor="navbar-search" className="sr-only">Buscar carteles</label>
                <input
                  id="navbar-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar carteles, frases, logos..."
                  className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none font-medium"
                />
                <button type="submit" aria-label="Buscar" className="text-gray-400 hover:text-cyan-400 transition-colors pl-2">
                  <MagnifyingGlassIcon className="size-5" />
                </button>
              </form>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                  aria-label="Abrir buscador"
                  className="md:hidden p-2.5 text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  <MagnifyingGlassIcon className="size-6" />
                </button>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-white text-[#050508] font-['Orbitron'] font-bold px-3.5 sm:px-5 h-10 sm:h-11 rounded-sm text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                >
                  <FaWhatsapp size={18} />
                  <span className="hidden sm:inline">Escribinos</span>
                </a>
              </div>
            </div>

            {mobileSearchOpen && (
              <form onSubmit={handleSearchSubmit} className="md:hidden pb-3 pt-1 flex items-center gap-2 animate-fade-in">
                <div className="flex-1 flex items-center bg-[#111117] border border-cyan-400/50 rounded-sm px-3 h-10">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar carteles, frases..."
                    autoFocus
                    className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
                  />
                  <button type="submit" className="text-cyan-400 pl-2">
                    <MagnifyingGlassIcon className="size-5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* 3. SUB-BARRA DE CATEGORÍAS */}
        <nav aria-label="Navegación principal" className="hidden md:block bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8 flex items-center justify-center gap-6 lg:gap-9 h-11">
            {navigation.map((item) => {
              const active = isActiveLink(item.href);
              const isHighlight = item.name === 'A medida';
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative h-full flex items-center text-xs font-['Orbitron'] font-bold uppercase tracking-[0.14em] transition-colors group ${
                    active ? 'text-cyan-400' : isHighlight ? 'text-cyan-300 hover:text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span className={`absolute left-0 bottom-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_#00f0ff] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        <DisclosurePanel className="md:hidden bg-[#0a0a0f]/98 backdrop-blur-xl border-b border-white/15 shadow-2xl">
          <div className="space-y-1 px-4 pt-4 pb-3">
            {navigation.map((item) => {
              const active = isActiveLink(item.href);
              return (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={`block px-4 py-3 text-xs font-['Orbitron'] font-bold uppercase tracking-[0.16em] rounded-sm transition-colors ${
                    active ? 'text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.name}
                </DisclosureButton>
              );
            })}
          </div>
          <div className="px-4 pb-5 pt-2 border-t border-white/10">
            <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-400 text-[#050508] px-4 py-3 rounded-sm text-xs font-['Orbitron'] font-bold uppercase tracking-widest transition-colors shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <FaWhatsapp size={18} /> Escribinos por WhatsApp
            </a>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
  );
}