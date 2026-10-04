import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaArrowRight, FaShoppingBag, FaCommentAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../api/axios';

import imgLumi from '../assets/images/lumi.png';
import bgLadrillos from '../assets/images/fondo.png';

const stats = [
  { value: "+500", label: "PROYECTOS" },
  { value: "100%", label: "A MEDIDA" },
  { value: "24H", label: "PROPUESTA" },
];

const waLink = "https://wa.me/5491164477337";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const res = await api.get('/products');
        const novedades = res.data
          .filter(p => p.category !== 'portfolio')
          .sort((a, b) => b.id - a.id)
          .slice(0, 6);
        setFeaturedProducts(novedades);
      } catch (error) {
        console.error("Error cargando novedades:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNovedades();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: clientWidth >= 1024 ? 350 : 280, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [featuredProducts]);

  const scrollLeft = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Orbitron:wght@500;700;900&family=Varela+Round&display=swap');
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="relative text-gray-300 font-['Rajdhani'] min-h-screen selection:bg-cyan-400 selection:text-black">
        
        {/* FONDO GLOBAL */}
        <div 
          className="fixed inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat transform-gpu"
          style={{ backgroundImage: `url(${bgLadrillos})` }}
        >
          <div className="absolute inset-0 bg-[#050508]/85"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,102,255,0.08)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,0,0,0.08)_0%,transparent_70%)] pointer-events-none"></div>
        </div>

        <div className="relative z-10">
          
          {/* ========================================= */}
          {/* 1. HERO CIBERPUNK                         */}
          {/* ========================================= */}
          {/* Reducimos el padding vertical y el max-width a 1200px */}
          <section className="relative pt-28 pb-10 px-4 md:px-8 w-full max-w-[1200px] mx-auto overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
              
              <div className="flex flex-col items-start text-left z-10 animate-fade-in-up order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-5">
                   <span className="h-[1px] w-8 bg-cyan-400 opacity-60"></span>
                   <p className="text-cyan-400 font-['Orbitron'] text-[9px] sm:text-[10px] font-bold tracking-[0.24em] uppercase">
                     Fabricación Nacional de Alta Gama
                   </p>
                </div>
                
                {/* Título más proporcionado */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Orbitron'] uppercase tracking-tight mb-5 leading-[1.1]">
                  Convertimos tus ideas <br/><span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">en realidad.</span>
                </h2>
                
                {/* Texto descriptivo un poco más chico */}
                <p className="text-gray-400 text-xs sm:text-sm md:text-base font-medium mb-8 leading-relaxed max-w-md">
                   Carteles de Neon Flex y letras corporeas
                </p>
                
                {/* Botones más compactos */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <Link to="/presupuesto" className="w-full sm:w-auto bg-cyan-500 hover:bg-white text-[#050508] font-bold font-['Orbitron'] px-6 py-3 rounded-sm transition-all text-[10px] sm:text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                    COTIZAR DISEÑO <FaArrowRight size={10} />
                  </Link>
                  <Link to="/productos" className="w-full sm:w-auto border border-white/20 hover:border-cyan-400 hover:text-cyan-400 text-white font-bold font-['Orbitron'] px-6 py-3 rounded-sm transition-all text-[10px] sm:text-xs tracking-widest uppercase flex items-center justify-center bg-[#050508]/50 backdrop-blur-sm">
                    VER CATÁLOGO
                  </Link>
                </div>
              </div>

              {/* Cartel Neón */}
              <div className="relative flex flex-col items-center select-none order-1 lg:order-2 mt-4 lg:mt-0">
               

                <div className="relative flex flex-col items-center rotate-[-2deg] transition-transform duration-700 hover:rotate-0 hover:scale-[1.02] z-10 cursor-default">
                  <div className="absolute -top-2 left-[20%] -translate-x-1/2 w-2 h-2 bg-gradient-to-b from-[#666] to-[#222] rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.8)] border border-white/20 z-20"></div>
                  <div className="absolute -top-2 right-[20%] translate-x-1/2 w-2 h-2 bg-gradient-to-b from-[#666] to-[#222] rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.8)] border border-white/20 z-20"></div>

                  <div className="absolute inset-0 bg-transparent backdrop-blur-[2px] border border-white/20 rounded-[1rem] shadow-[0_15px_35px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(0,240,255,0.1)] -m-3 sm:-m-4"></div>
                  
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-white/40 to-black/80 -mt-1 -ml-1 sm:-mt-1.5 sm:-ml-1.5 shadow-inner border border-black/50 z-20"></div>
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-white/40 to-black/80 -mt-1 -mr-1 sm:-mt-1.5 sm:-mr-1.5 shadow-inner border border-black/50 z-20"></div>
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-white/40 to-black/80 -mb-1 -ml-1 sm:-mb-1.5 sm:-ml-1.5 shadow-inner border border-black/50 z-20"></div>
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-white/40 to-black/80 -mb-1 -mr-1 sm:-mb-1.5 sm:-mr-1.5 shadow-inner border border-black/50 z-20"></div>

                  <h1 className="relative font-['Varela_Round'] text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.5rem] leading-[1.1] text-center flex flex-col items-center z-10 px-3 py-1 uppercase tracking-wide">
                    <span className="text-[#ffb3b3] drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] [text-shadow:0_0_10px_#ff0000,0_0_20px_#ff0000,0_0_40px_#ff0000]">
                      Dale originalidad
                    </span>
                    <span className="text-[#e0ffff] drop-shadow-[0_0_15px_rgba(0,240,255,0.8)] [text-shadow:0_0_10px_#00f0ff,0_0_20px_#00f0ff,0_0_40px_#00f0ff] mt-1">
                      a tu lugar
                    </span>
                  </h1>
                </div>
              </div>
            </div>
           
          </section>

          {/* ========================================= */}
          {/* 2. CARRUSEL NOVEDADES                     */}
          {/* ========================================= */}
          {/* Reducimos el padding py-24 a py-16 */}
          <section className="py-16 px-4 md:px-8 max-w-[1200px] mx-auto border-t border-white/10 bg-[#0a0a0f]/40 backdrop-blur-sm overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 relative z-10">
              <div>
                <p className="text-cyan-400 font-['Orbitron'] text-[10px] sm:text-xs font-bold tracking-[0.2em] mb-2 flex items-center gap-2">
                  <span className="w-5 h-[1px] bg-cyan-400"></span> ÚLTIMOS DISEÑOS
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Orbitron'] uppercase tracking-tight">
                  <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">Novedades</span>
                </h2>
              </div>
              
              <div className="flex items-center gap-2">
                <button onClick={scrollLeft} className="w-8 h-8 flex items-center justify-center rounded-sm bg-[#111117] border border-white/10 text-white hover:text-cyan-400 hover:border-cyan-400/50 transition-colors">
                  <FaChevronLeft size={12} />
                </button>
                <button onClick={scrollRight} className="w-8 h-8 flex items-center justify-center rounded-sm bg-[#111117] border border-white/10 text-white hover:text-cyan-400 hover:border-cyan-400/50 transition-colors">
                  <FaChevronRight size={12} />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400"></div>
              </div>
            ) : (
              <div 
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6"
              >
                {featuredProducts.map((prod) => {
                  const formattedPrice = Math.round(prod.price).toLocaleString("es-AR");
                  const message = encodeURIComponent(`Hola NeonFlexPremium, quiero comprar el cartel "${prod.title}" por $${formattedPrice}.`);

                  return (
                    <div key={prod.id} className="min-w-[75vw] sm:min-w-[calc(50%-8px)] lg:min-w-[calc(33.333%-11px)] xl:min-w-[calc(25%-12px)] snap-start bg-[#111117]/80 backdrop-blur-md border border-white/5 rounded-sm overflow-hidden group hover:border-cyan-400/30 transition-colors flex flex-col">
                      <div className="relative aspect-square bg-black overflow-hidden border-b border-white/5">
                        <img src={prod.image_url} alt={prod.title} loading="lazy" decoding="async" className="w-full h-full object-cover filter saturate-90 group-hover:scale-105 group-hover:saturate-100 transition-transform duration-500 will-change-transform" />
                        <div className="absolute top-2 left-2 bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-[7px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-widest z-10 flex items-center gap-1 backdrop-blur-sm">
                          <span className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></span> NUEVO
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{prod.medidas || prod.category}</p>
                        <h3 className="text-white font-['Orbitron'] font-bold text-sm tracking-wide uppercase group-hover:text-cyan-400 transition-colors line-clamp-1">
                          {prod.title}
                        </h3>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                          <div>
                            <span className="block text-[8px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-0.5">Precio</span>
                            <span className="text-white font-['Orbitron'] font-black text-base">${formattedPrice}</span>
                          </div>
                          <a href={`${waLink}?text=${message}`} target="_blank" rel="noreferrer" className="bg-cyan-500 hover:bg-cyan-400 text-[#050508] px-3 py-2 rounded-sm text-[9px] font-bold font-['Orbitron'] tracking-widest flex items-center gap-1.5 transition-colors">
                            <FaShoppingBag size={10} /> COMPRAR
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="text-center mt-6 relative z-10">
              <Link to="/productos" className="inline-flex items-center gap-2 text-white font-bold font-['Orbitron'] text-[10px] sm:text-xs tracking-widest border-b border-cyan-400 pb-1 hover:text-cyan-400 transition-colors">
                VER CATÁLOGO COMPLETO <FaArrowRight size={10} />
              </Link>
            </div>
          </section>

          {/* ========================================= */}
          {/* 3. SECCIÓN PERSONALIZADOS / PRESUPUESTO   */}
          {/* ========================================= */}
          <section className="bg-[#111117]/60 backdrop-blur-md border-y border-white/5 py-16 px-4 md:px-8">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="relative aspect-[4/3] bg-black border border-white/10 rounded-sm overflow-hidden group shadow-2xl">
                <img src={imgLumi} alt="Custom Neon" loading="lazy" decoding="async" className="w-full h-full object-cover filter contrast-110 saturate-90 group-hover:saturate-100 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#050508]/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 right-4 bg-cyan-500 text-[#050508] px-3 py-1.5 font-['Orbitron'] font-black text-[10px] tracking-widest rounded-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#050508] rounded-full animate-pulse"></span>
                  Nº 500+ PROYECTOS
                </div>
              </div>

              <div>
                <p className="text-cyan-400 font-['Orbitron'] text-[10px] font-bold tracking-[0.2em] mb-2">TU DISEÑO. NUESTRA TÉCNICA.</p>
                <h2 className="text-3xl sm:text-4xl font-black text-white font-['Orbitron'] uppercase tracking-tight mb-5 leading-tight">
                  ¿Tenés una idea?<br /><span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">Hagámosla brillar.</span>
                </h2>
                <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed font-medium">
                  Nos mandás tu frase, logo o referencia. Nuestro equipo la convierte en un diseño listo para producir, sin costo y sin compromiso.
                </p>

                <ol className="space-y-3 mb-8">
                  {[
                    ["CONTANOS TU IDEA", "Compartí texto, tamaño y color por WhatsApp."],
                    ["RECIBÍ TU DISEÑO", "Te enviamos un mockup digital en menos de 24 h."],
                    ["LO HACEMOS REAL", "Producimos y enviamos tu cartel listo para instalar."]
                  ].map(([title, desc], i) => (
                    <li key={i} className="flex items-start gap-4 p-3 border border-white/5 bg-[#0a0a0f]/50 rounded-sm hover:border-cyan-400/20 transition-colors">
                      <span className="text-cyan-400 font-['Orbitron'] font-black text-base">0{i+1}</span>
                      <div>
                        <b className="text-white font-['Orbitron'] text-xs tracking-wider block mb-0.5 uppercase">{title}</b>
                        <small className="text-gray-400 text-[11px] font-medium">{desc}</small>
                      </div>
                    </li>
                  ))}
                </ol>

                <Link to="/presupuesto" className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#050508] font-bold font-['Orbitron'] px-6 py-3 rounded-sm text-[10px] sm:text-xs tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                  <FaCommentAlt size={12} /> PEDIR PRESUPUESTO
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
};

export default Home;