import React, { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { 
  FaStar, FaArrowRight, FaTruck, FaCreditCard, FaStore, FaWhatsapp, FaCheck, FaAngleDown
} from 'react-icons/fa';

import imgAbasta from '../assets/images/abasta.png';
import imgAlas from '../assets/images/alas.png';
import imgMurcielago from '../assets/images/alasdiablo.png';
import imgCabrona from '../assets/images/cabrona.png';
import imgBeerTruck from '../assets/images/cerveza.png';
import imgAuto from '../assets/images/coche.png';
import imgBurger from '../assets/images/hamburguesa.png';
import imgDiego from '../assets/images/firmadiego.png';
import imgLogoM from '../assets/images/logoraro.png';
import imgLumi from '../assets/images/lumi.png';

const heroImages = [
  imgAbasta, imgAlas, imgMurcielago, imgCabrona, imgBeerTruck,
  imgAuto, imgBurger, imgDiego, imgLogoM, imgLumi
];

const RevealOnScroll = ({ children, direction = 'up', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let translateClass = 'translate-y-16';
  if (direction === 'left') translateClass = '-translate-x-16';
  if (direction === 'right') translateClass = 'translate-x-16';

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${translateClass}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      const trabajosRealizados = res.data.filter(p => p.category === 'portfolio').slice(0, 4);
      setProducts(trabajosRealizados); 
    } catch (error) {
      console.error("Error cargando portfolio");
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <div className="bg-white dark:bg-neutral-950 text-gray-900 dark:text-white font-tilt transition-colors duration-300 overflow-hidden">
      
      {/* ========================================= */}
      {/* 1. HERO SECTION (TAMAÑO REFINADO)           */}
      {/* ========================================= */}
      <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          {heroImages.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`Cartel Ambiente ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transform transition-all duration-[7000ms] ease-out ${
                index === currentHeroIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.8)_100%)]"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 px-4 pt-32 pb-20 flex flex-col items-center justify-center min-h-screen">
          
          <div className="animate-fade-in-down mb-6">
             <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl [font-family:system-ui,sans-serif]">
               <span className="w-1.5 h-1.5 rounded-full bg-neon-red animate-pulse"></span>
               Diseño & Fabricación a Medida
             </span>
          </div>
          
          {/* TAMAÑOS REDUCIDOS PARA ESCRITORIO */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 text-white leading-[1] tracking-tight animate-fade-in-up uppercase">
            Creamos Neón <br/>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-red-300 drop-shadow-[0_0_25px_rgba(0,240,255,0.8)] lowercase text-5xl md:text-7xl lg:text-[6.5rem] tracking-normal">
              que atrapa miradas
            </span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Elevamos la identidad visual de tu local o evento con cartelería LED premium. Cotización en el día, calidad garantizada.
          </p>
          
          <div className="flex justify-center animate-fade-in-up delay-300">
            <Link to="/presupuesto" className="group relative w-full sm:w-auto bg-white text-black font-black py-4 px-10 rounded-full transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs md:text-sm hover:scale-105 overflow-hidden [font-family:system-ui,sans-serif]">
              <span className="relative z-10 flex items-center gap-3">Cotizar mi proyecto <FaArrowRight className="group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer z-0"></div>
            </Link>
          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center animate-bounce text-white/50">
           <span className="text-[9px] uppercase tracking-[0.3em] font-bold mb-2 [font-family:system-ui,sans-serif]">Descubrir</span>
           <FaAngleDown size={16} />
        </div>
      </div>

      {/* CINTA DE CONFIANZA */}
      <RevealOnScroll direction="up" delay={0}>
        <div className="bg-neutral-900 text-white border-y border-neutral-800 py-3 relative z-20">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between gap-6 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-300 [font-family:system-ui,sans-serif]">
            <div className="flex items-center gap-2"><FaTruck className="text-neon-red text-sm" /> Envíos a todo el país</div>
            <div className="flex items-center gap-2"><FaCreditCard className="text-neon-blue text-sm" /> Todos los medios de pago</div>
            <div className="flex items-center gap-2"><FaStore className="text-purple-500 text-sm" /> Calidad Premium Garantizada</div>
          </div>
        </div>
      </RevealOnScroll>

      {/* ========================================= */}
      {/* 2. CATEGORÍAS (H-72 en vez de H-80)       */}
      {/* ========================================= */}
      <div className="max-w-6xl mx-auto py-20 px-4 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <RevealOnScroll direction="left" delay={0}>
            <Link to="/productos" className="group relative h-72 rounded-2xl overflow-hidden bg-black shadow-lg block">
               <img src={imgCabrona} alt="Frases en Neón" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
               <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-black text-white tracking-wide mb-1 uppercase">Frases</h3>
                  <p className="text-neon-blue font-bold text-xs uppercase tracking-widest flex items-center gap-2 [font-family:system-ui,sans-serif]">Ver diseños <FaArrowRight/></p>
               </div>
            </Link>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={200}>
            <Link to="/presupuesto" className="group relative h-72 rounded-2xl overflow-hidden bg-black shadow-lg block">
               <img src={imgAbasta} alt="Logos a Medida" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
               <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-black text-white tracking-wide mb-1 uppercase">Comercios</h3>
                  <p className="text-neon-red font-bold text-xs uppercase tracking-widest flex items-center gap-2 [font-family:system-ui,sans-serif]">Cotizar mi logo <FaArrowRight/></p>
               </div>
            </Link>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={400}>
            <Link to="/productos" className="group relative h-72 rounded-2xl overflow-hidden bg-black shadow-lg block">
               <img src={imgBurger} alt="Deco Neón" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
               <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-black text-white tracking-wide mb-1 uppercase">Figuras</h3>
                  <p className="text-yellow-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2 [font-family:system-ui,sans-serif]">Ver catálogo <FaArrowRight/></p>
               </div>
            </Link>
          </RevealOnScroll>

        </div>
      </div>

      {/* ========================================= */}
      {/* 3. ÚLTIMOS TRABAJOS (PORTFOLIO)           */}
      {/* ========================================= */}
      <div className="max-w-6xl mx-auto pb-20 px-4 relative z-20">
        <RevealOnScroll direction="up" delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                Últimos Trabajos
              </h2>
              <div className="w-16 h-1 bg-neon-blue mt-3"></div>
            </div>
            <a href="https://www.instagram.com/neonflexpremium/" target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 [font-family:system-ui,sans-serif]">
              Ver en Instagram <FaArrowRight />
            </a>
          </div>
        </RevealOnScroll>

        {products.length === 0 ? (
           <p className="text-gray-500 text-sm [font-family:system-ui,sans-serif]">Cargando portfolio...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((prod, index) => (
              <RevealOnScroll direction="up" delay={index * 150} key={prod.id}>
                <div className="group cursor-pointer">
                  <div className="bg-black rounded-xl overflow-hidden relative aspect-square mb-4 border border-gray-200 dark:border-neutral-800 shadow-md">
                     <img src={prod.image_url} alt={prod.title} className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-black text-xl uppercase mb-1 line-clamp-1">{prod.title}</h3>
                    <p className="text-gray-500 dark:text-neutral-400 text-xs mb-3 line-clamp-2 [font-family:system-ui,sans-serif]">{prod.description || 'Diseño personalizado en Neón LED'}</p>
                    <Link to="/presupuesto" className="text-blue-600 dark:text-neon-blue font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity [font-family:system-ui,sans-serif]">
                      Quiero algo así <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>

      {/* ========================================= */}
      {/* 4. PROCESO INDUSTRIAL A MEDIDA            */}
      {/* ========================================= */}
      <div className="relative py-20 px-4 bg-neutral-950 overflow-hidden border-y border-neutral-900 z-20">
        <div className="absolute inset-0 opacity-20">
           <img src={imgAlas} alt="Taller Neon" className="w-full h-full object-cover blur-sm" />
           <div className="absolute inset-0 bg-neutral-950/90"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <RevealOnScroll direction="up" delay={0}>
            <div className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                Hacemos tu idea <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-neon-red drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">realidad</span>
              </h2>
              <p className="text-neutral-400 mt-3 text-sm md:text-base [font-family:system-ui,sans-serif]">Proceso 100% personalizado, desde el boceto hasta tu pared.</p>
            </div>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <RevealOnScroll direction="up" delay={100}>
              <div className="relative p-6 border border-neutral-800 bg-neutral-900/50 backdrop-blur-md rounded-2xl hover:border-neon-blue transition-colors group">
                <span className="absolute -top-4 -right-2 text-8xl font-black text-white/5 group-hover:text-neon-blue/10 transition-colors pointer-events-none">1</span>
                <h3 className="text-2xl font-black text-white uppercase mb-2 relative z-10">La Idea</h3>
                <p className="text-neutral-400 text-xs leading-relaxed relative z-10 [font-family:system-ui,sans-serif]">Envianos tu logo, frase o dibujo junto con las medidas. Te pasamos la cotización en el día.</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={250}>
              <div className="relative p-6 border border-neutral-800 bg-neutral-900/50 backdrop-blur-md rounded-2xl hover:border-neon-red transition-colors group">
                <span className="absolute -top-4 -right-2 text-8xl font-black text-white/5 group-hover:text-neon-red/10 transition-colors pointer-events-none">2</span>
                <h3 className="text-2xl font-black text-white uppercase mb-2 relative z-10">Diseño</h3>
                <p className="text-neutral-400 text-xs leading-relaxed relative z-10 [font-family:system-ui,sans-serif]">Con una seña del 50%, preparamos un render digital para que veas cómo quedará exactamente.</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={400}>
              <div className="relative p-6 border border-neutral-800 bg-neutral-900/50 backdrop-blur-md rounded-2xl hover:border-purple-500 transition-colors group">
                <span className="absolute -top-4 -right-2 text-8xl font-black text-white/5 group-hover:text-purple-500/10 transition-colors pointer-events-none">3</span>
                <h3 className="text-2xl font-black text-white uppercase mb-2 relative z-10">Taller</h3>
                <p className="text-neutral-400 text-xs leading-relaxed relative z-10 [font-family:system-ui,sans-serif]">Cortamos el acrílico a láser y ensamblamos el neón a mano con precisión milimétrica.</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={550}>
              <div className="relative p-6 border border-neutral-800 bg-neutral-900/50 backdrop-blur-md rounded-2xl hover:border-green-500 transition-colors group">
                <span className="absolute -top-4 -right-2 text-8xl font-black text-white/5 group-hover:text-green-500/10 transition-colors pointer-events-none">4</span>
                <h3 className="text-2xl font-black text-white uppercase mb-2 relative z-10">Entrega</h3>
                <p className="text-neutral-400 text-xs leading-relaxed relative z-10 [font-family:system-ui,sans-serif]">Te enviamos fotos del resultado final. Abonás el saldo y despachamos a todo el país.</p>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll direction="up" delay={600}>
            <div className="mt-10 text-center">
              <Link to="/presupuesto" className="inline-flex items-center gap-2 bg-white text-black font-black py-3 px-8 rounded-full hover:scale-105 transition-transform uppercase tracking-widest text-xs [font-family:system-ui,sans-serif]">
                 Cotizar Ahora <FaWhatsapp className="text-green-500 text-lg" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* ========================================= */}
      {/* 5. ANATOMÍA DEL NEÓN (PROPORCIONES FINAS) */}
      {/* ========================================= */}
      <div className="py-20 px-4 bg-white dark:bg-neutral-950 transition-colors duration-300 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          
          <RevealOnScroll direction="right" delay={0}>
            <div className="w-full lg:w-full">
              <span className="text-blue-600 dark:text-neon-blue font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2 block [font-family:system-ui,sans-serif]">Calidad Constructiva</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase leading-[1.1] mb-10">
                La Anatomía <br/> de un buen neón
              </h2>

              <div className="space-y-6">
                 <div className="flex gap-4 items-start">
                    <div className="mt-1 bg-gray-100 dark:bg-neutral-800 p-2 rounded-md text-gray-700 dark:text-gray-300 shadow-sm">
                      <FaCheck size={12} />
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-gray-900 dark:text-white uppercase">Base de Acrílico</h4>
                      <p className="text-gray-500 dark:text-neutral-400 text-xs mt-1 leading-relaxed [font-family:system-ui,sans-serif] max-w-md">Placas de 4mm de espesor, cortadas con láser de alta precisión. Son totalmente transparentes e irrompibles.</p>
                    </div>
                 </div>
                 
                 <div className="flex gap-4 items-start">
                    <div className="mt-1 bg-gray-100 dark:bg-neutral-800 p-2 rounded-md text-gray-700 dark:text-gray-300 shadow-sm">
                      <FaCheck size={12} />
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-gray-900 dark:text-white uppercase">LED 12V Premium</h4>
                      <p className="text-gray-500 dark:text-neutral-400 text-xs mt-1 leading-relaxed [font-family:system-ui,sans-serif] max-w-md">Manguera de silicona que no levanta temperatura. Ultra bajo consumo eléctrico y más de 50.000 horas de vida útil real.</p>
                    </div>
                 </div>

                 <div className="flex gap-4 items-start">
                    <div className="mt-1 bg-gray-100 dark:bg-neutral-800 p-2 rounded-md text-gray-700 dark:text-gray-300 shadow-sm">
                      <FaCheck size={12} />
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-gray-900 dark:text-white uppercase">Listo para Colgar</h4>
                      <p className="text-gray-500 dark:text-neutral-400 text-xs mt-1 leading-relaxed [font-family:system-ui,sans-serif] max-w-md">Se entrega con fuente de alimentación a 220v, orificios de montaje, cable transparente y garantía de 6 meses.</p>
                    </div>
                 </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="left" delay={200}>
            <div className="w-full max-w-md mx-auto relative px-4 md:px-0">
               <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-900/10 rounded-[2rem] transform translate-x-4 translate-y-4 md:translate-x-5 md:translate-y-5"></div>
               <img 
                 src={imgLumi} 
                 alt="Neón Lumi" 
                 className="relative rounded-[1.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-neutral-800 w-full object-cover aspect-square md:aspect-[4/3] z-10"
               />
            </div>
          </RevealOnScroll>

        </div>
      </div>

    </div>
  );
};

export default Home;