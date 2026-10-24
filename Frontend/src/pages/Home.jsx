import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaWhatsapp, 
  FaArrowRight, 
  FaCommentAlt, 
  FaChevronLeft, 
  FaChevronRight,
  FaTruck,
  FaShieldAlt,
  FaPencilRuler,
  FaPlug,
  FaInstagram
} from 'react-icons/fa';
import api from '../api/axios';
import ProductDetail from '../components/ProductDetail';

import imgLumi from '../assets/images/tijera.jpeg';
import bgLadrillos from '../assets/images/pared.jpg';

const waLink = "https://wa.me/5491164477337";
const igLink = "https://instagram.com/neonflexpremium";

const heroSlides = [
  {
    title: "Convertimos tus ideas",
    highlight: "en realidad.",
    desc: "Carteles de neón flex hechos a medida.",
    ctaText: "PEDIR PRESUPUESTO",
    ctaLink: "/presupuesto",
  },
  {
    title: "¿Tenés una idea?",
    highlight: "Hagámosla brillar.",
    desc: "Te enviamos el diseño sin costo y sin compromiso.",
    ctaText: "PEDIR PRESUPUESTO",
    ctaLink: "/presupuesto",
  },
  {
    title: "Fabricación nacional",
    highlight: "de alta gama.",
    desc: "Carteles LED y letras corpóreas listas para colgar.",
    ctaText: "VER CATÁLOGO",
    ctaLink: "/productos",
  }
];

const benefits = [
  {
    icon: FaTruck,
    title: "Envíos a todo el país",
    desc: ""
  },
  {
    icon: FaShieldAlt,
    title: "Garantia",
    desc: "Cubre fallas técnicas y de iluminación"
  },
  {
    icon: FaPencilRuler,
    title: "Cotizacion sin costo",
    desc: "Tu presupuesto en menos de 24 hs"
  },
  {
    icon: FaPlug,
    title: "Listo para colgar",
    desc: "Incluye fuente de 12 V para enchufar a 220 V"
  }
];

const categories = [
  {
    name: "Frases",
    subtitle: "Inspiración y actitud",
    link: "/productos?categoria=frases",
    accent: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    borderHover: "hover:border-cyan-400",
    glow: "group-hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]",
    sampleText: "Good Vibes"
  },
  {
    name: "Figuras",
    subtitle: "Íconos y siluetas LED",
    link: "/productos?categoria=figuras",
    accent: "from-red-500/20 via-red-500/5 to-transparent",
    borderHover: "hover:border-red-400",
    glow: "group-hover:shadow-[0_0_25px_rgba(255,59,59,0.2)]",
    sampleText: "⚡ ★ ♡"
  },
  {
    name: "Negocios",
    subtitle: "Logos y cartelería comercial",
    link: "/productos?categoria=negocios",
    accent: "from-blue-500/20 via-blue-500/5 to-transparent",
    borderHover: "hover:border-blue-400",
    glow: "group-hover:shadow-[0_0_25px_rgba(40,100,255,0.2)]",
    sampleText: "OPEN 24H"
  },
  {
    name: "A medida",
    subtitle: "Tu boceto desde cero",
    link: "/presupuesto",
    accent: "from-purple-500/20 via-purple-500/5 to-transparent",
    borderHover: "hover:border-purple-400",
    glow: "group-hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]",
    sampleText: "Tu Idea"
  }
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [portfolioPreview, setPortfolioPreview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const res = await api.get('/products');
        const allProducts = Array.isArray(res.data) ? res.data : [];

        const novedades = allProducts
          .filter(p => p.category !== 'portfolio')
          .sort((a, b) => b.id - a.id)
          .slice(0, 8);

        const igItems = allProducts
          .sort((a, b) => b.id - a.id)
          .slice(0, 6);

        setFeaturedProducts(novedades);
        setPortfolioPreview(igItems);
      } catch (error) {
        console.error("Error cargando novedades:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNovedades();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
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
    }, 4500);
    return () => clearInterval(interval);
  }, [featuredProducts]);

  const scrollLeft = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };


  const slide = heroSlides[currentSlide];

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

      <div className="relative text-gray-300 font-['Rajdhani'] min-h-screen selection:bg-cyan-40 selection:text-black">
        
        <div 
          className="fixed inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat transform-gpu"
          style={{ backgroundImage: `url(${bgLadrillos})` }}
        >
          <div className="absolute inset-0 bg-[#050508]/85"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(0,240,255,0.08)_0%,transparent_10%)] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(255,0,55,0.08)_0%,transparent_20%)] pointer-events-none"></div>
        </div>

        <div className="relative z-10">

         <section className="relative pt-36 md:pt-44 pb-16 px-4 md:px-8 w-full max-w-[1200px] mx-auto overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[380px]">
              
              <div className="flex flex-col items-start text-left z-10 order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Orbitron'] uppercase tracking-tight mb-3 leading-[1.12]">
                  {slide.title} <br/>
                  <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.35)]">
                    {slide.highlight}
                  </span>
                </h1>
                
                <p className="text-gray-400 text-base sm:text-lg font-medium mb-7 max-w-md">
                  {slide.desc}
                </p>
                
                <Link 
                  to={slide.ctaLink} 
                  className="w-full sm:w-auto bg-cyan-500 hover:bg-white text-[#050508] font-bold font-['Orbitron'] px-7 py-3.5 rounded-sm transition-all text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                >
                  {slide.ctaText} <FaArrowRight size={11} />
                </Link>

                <div className="mt-8 flex items-center gap-2.5">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Ir al slide ${index + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentSlide === index 
                          ? "w-7 bg-cyan-400 shadow-[0_0_10px_#00f0ff]" 
                          : "w-2 bg-white/20 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative flex flex-col items-center select-none order-1 lg:order-2">
                <div className="relative flex flex-col items-center rotate-[-2deg] transition-transform duration-700 hover:rotate-0 hover:scale-[1.02] z-10 cursor-default">
                  <div className="absolute -top-2 left-[20%] -translate-x-1/2 w-2 h-2 bg-gradient-to-b from-[#666] to-[#222] rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.8)] border border-white/20 z-20"></div>
                  <div className="absolute -top-2 right-[20%] translate-x-1/2 w-2 h-2 bg-gradient-to-b from-[#666] to-[#222] rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.8)] border border-white/20 z-20"></div>

                  <div className="absolute inset-0 bg-transparent backdrop-blur-[2px] border border-white/20 rounded-[1rem] shadow-[0_15px_35px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(0,240,255,0.1)] -m-3 sm:-m-4"></div>
                  
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-white/40 to-black/80 -mt-1 -ml-1 sm:-mt-1.5 sm:-ml-1.5 shadow-inner border border-black/50 z-20"></div>
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-white/40 to-black/80 -mt-1 -mr-1 sm:-mt-1.5 sm:-mr-1.5 shadow-inner border border-black/50 z-20"></div>
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-white/40 to-black/80 -mb-1 -ml-1 sm:-mb-1.5 sm:-ml-1.5 shadow-inner border border-black/50 z-20"></div>
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-white/40 to-black/80 -mb-1 -mr-1 sm:-mb-1.5 sm:-mr-1.5 shadow-inner border border-black/50 z-20"></div>

                  <div className="relative font-['Varela_Round'] text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.5rem] leading-[1.1] text-center flex flex-col items-center z-10 px-3 py-1 uppercase tracking-wide">
                    <span className="text-[#ffb3b3] drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] [text-shadow:0_0_10px_#ff0000,0_0_20px_#ff0000,0_0_40px_#ff0000]">
                      Dale originalidad
                    </span>
                    <span className="text-[#e0ffff] drop-shadow-[0_0_15px_rgba(0,240,255,0.8)] [text-shadow:0_0_10px_#00f0ff,0_0_20px_#00f0ff,0_0_40px_#00f0ff] mt-1">
                      a tu lugar
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          <section className="border-y border-white/10 bg-[#111117]/80 backdrop-blur-md">
            <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
                {benefits.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 lg:px-6 first:lg:pl-0 last:lg:pr-0">
                      <div className="w-10 h-10 rounded-sm bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_12px_rgba(0,240,255,0.15)]">
                        <IconComponent size={18} />
                      </div>
                      <div>
                        <h3 className="text-white font-['Orbitron'] text-xs font-bold uppercase tracking-wider mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm font-medium leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-16 px-4 md:px-8 max-w-[1200px] mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
              <div>
                <p className="text-cyan-400 font-['Orbitron'] text-[10px] sm:text-xs font-bold tracking-[0.2em] mb-2 flex items-center gap-2 uppercase">
                  <span className="w-5 h-[1px] bg-cyan-400"></span> Explorá por estilo
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-['Orbitron'] uppercase tracking-tight">
                  Comprá por <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">categoría</span>
                </h2>
              </div>
              <Link to="/productos" className="text-cyan-400 hover:text-white font-['Orbitron'] text-xs font-bold tracking-widest uppercase flex items-center gap-2 border-b border-cyan-400/40 pb-1 transition-colors">
                Ver todo el catálogo <FaArrowRight size={10} />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {categories.map((cat, idx) => (
                <Link
                  key={idx}
                  to={cat.link}
                  className={`group relative aspect-square bg-[#111117]/90 border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between p-5 transition-all duration-300 hover:-translate-y-1 ${cat.borderHover} ${cat.glow}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.accent} opacity-70 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="relative z-10 flex-1 flex items-center justify-center">
                    <span className="font-['Varela_Round'] text-xl sm:text-2xl md:text-3xl text-white/80 group-hover:text-white group-hover:scale-105 transition-all text-center drop-shadow-[0_0_12px_rgba(0,240,255,0.5)]">
                      {cat.sampleText}
                    </span>
                  </div>

                  <div className="relative z-10 bg-[#050508]/90 border border-white/10 group-hover:border-cyan-400/40 rounded-sm p-3 backdrop-blur-md transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-['Orbitron'] font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
                        {cat.name}
                      </span>
                      <FaArrowRight size={11} className="text-cyan-400 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5 truncate">
                      {cat.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 4. ÚLTIMOS DISEÑOS CON APERTURA DE MODAL */}
          <section className="py-16 px-4 md:px-8 max-w-[1200px] mx-auto border-t border-white/10 bg-[#0a0a0f]/40 backdrop-blur-sm overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 relative z-10">
              <div>
                <p className="text-cyan-400 font-['Orbitron'] text-[10px] sm:text-xs font-bold tracking-[0.2em] mb-2 flex items-center gap-2 uppercase">
                  <span className="w-5 h-[1px] bg-cyan-400"></span> Catálogo Destacado
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-['Orbitron'] uppercase tracking-tight">
                  Últimos <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">diseños</span>
                </h2>
              </div>
              
              <div className="flex items-center gap-3">
                <Link to="/productos" className="hidden sm:inline-flex items-center gap-2 text-cyan-400 hover:text-white font-['Orbitron'] text-xs font-bold tracking-widest uppercase mr-2 transition-colors">
                  Ver todos <FaArrowRight size={10} />
                </Link>
                <button onClick={scrollLeft} aria-label="Anterior" className="w-9 h-9 flex items-center justify-center rounded-sm bg-[#111117] border border-white/10 text-white hover:text-cyan-400 hover:border-cyan-400/50 transition-colors">
                  <FaChevronLeft size={12} />
                </button>
                <button onClick={scrollRight} aria-label="Siguiente" className="w-9 h-9 flex items-center justify-center rounded-sm bg-[#111117] border border-white/10 text-white hover:text-cyan-400 hover:border-cyan-400/50 transition-colors">
                  <FaChevronRight size={12} />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-56">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400"></div>
              </div>
            ) : (
              <div 
                ref={carouselRef}
                className="flex gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6"
              >
                {featuredProducts.map((prod, idx) => {
                  const formattedPrice = Math.round(prod.price).toLocaleString("es-AR");
                  const message = encodeURIComponent(`Hola NeonFlex Premium, quiero comprar el cartel "${prod.title}" por $${formattedPrice}.`);

                  return (
                    <article 
                      key={prod.id} 
                      onClick={() => setSelectedProduct(prod)}
                      className="min-w-[78vw] sm:min-w-[calc(50%-10px)] lg:min-w-[calc(33.333%-14px)] xl:min-w-[calc(25%-15px)] snap-start bg-[#111117]/90 backdrop-blur-md border border-white/10 rounded-sm overflow-hidden group hover:border-cyan-400/50 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
                    >
                      <div className="relative aspect-square bg-black overflow-hidden border-b border-white/10">
                        <img 
                          src={prod.image_url} 
                          alt={prod.title} 
                          loading="lazy" 
                          decoding="async" 
                          className="w-full h-full object-cover filter saturate-95 group-hover:scale-105 group-hover:saturate-100 transition-transform duration-500 will-change-transform" 
                        />
                        <div className="absolute top-2.5 left-2.5 bg-[#050508]/80 border border-cyan-400/40 text-cyan-400 text-[8px] font-['Orbitron'] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest z-10 flex items-center gap-1.5 backdrop-blur-sm">
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span> #{String(idx + 1).padStart(2, '0')}
                        </div>
                        <div className="absolute z-10 right-2.5 bottom-2.5 grid w-8 h-8 place-items-center border border-white/15 bg-[#050508]/75 text-white backdrop-blur-md group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors">
                          <FaArrowRight size={11} />
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-white font-['Orbitron'] font-bold text-sm tracking-wide uppercase group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
                          {prod.title}
                        </h3>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
                          {prod.medidas || prod.category}
                        </p>

                        <div className="mt-auto pt-3 border-t border-white/10">
                          <p className="text-white font-['Orbitron'] font-black text-lg leading-none mb-1">
                            $ {formattedPrice}
                          </p>
                          <p className="text-[11px] text-gray-400 font-medium mb-4">
                            Precio final en efectivo o transferencia
                          </p>

                          <a 
                            href={`${waLink}?text=${message}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            className="w-full bg-cyan-500 hover:bg-white text-[#050508] py-2.5 px-3 rounded-sm text-[10px] font-bold font-['Orbitron'] tracking-widest uppercase flex items-center justify-center gap-2 transition-colors shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                          >
                            <FaWhatsapp size={14} /> Comprar por WhatsApp
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            <div className="text-center mt-4 sm:hidden relative z-10">
              <Link to="/productos" className="inline-flex items-center gap-2 text-white font-bold font-['Orbitron'] text-xs tracking-widest border-b border-cyan-400 pb-1 hover:text-cyan-400 transition-colors">
                VER CATÁLOGO COMPLETO <FaArrowRight size={10} />
              </Link>
            </div>
          </section>

          <section className="py-12 px-4 md:px-8 max-w-[1200px] mx-auto">
            <div className="relative bg-[#111117]/90 border border-white/10 rounded-sm p-8 sm:p-12 md:p-16 text-center overflow-hidden shadow-2xl">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-500/10 blur-[80px] pointer-events-none" />
              <blockquote className="relative z-10 max-w-3xl mx-auto font-['Orbitron'] text-lg sm:text-2xl md:text-3xl font-bold text-white leading-relaxed mb-4">
                “No fabricamos neón en serie. Diseñamos la luz que hace <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">único cada lugar</span>.”
              </blockquote>
              <p className="relative z-10 text-xs sm:text-sm font-['Orbitron'] tracking-[0.25em] text-gray-400 uppercase">
                Taller NeonFlex Premium · Fabricación a medida
              </p>
            </div>
          </section>

          <section className="bg-[#111117]/60 backdrop-blur-md border-y border-white/10 py-16 px-4 md:px-8">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="relative aspect-[4/3] bg-black border border-white/10 rounded-sm overflow-hidden group shadow-2xl">
                <img src={imgLumi} alt="Taller NeonFlex trabajando a medida" loading="lazy" decoding="async" className="w-full h-full object-cover filter contrast-110 saturate-90 group-hover:saturate-100 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#050508]/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 right-4 bg-cyan-500 text-[#050508] px-3 py-1.5 font-['Orbitron'] font-black text-[10px] tracking-widest rounded-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#050508] rounded-full animate-pulse"></span>
                  MÁS DE 500 PROYECTOS A MEDIDA
                </div>
              </div>

              <div>
                <p className="text-cyan-400 font-['Orbitron'] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
                  Tu diseño · Nuestra técnica
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-['Orbitron'] uppercase tracking-tight mb-4 leading-tight">
                  ¿Tenés una idea?<br />
                  <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">Hagámosla brillar.</span>
                </h2>
                <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed font-medium">
                  Nos mandás tu frase, logo o referencia. Nuestro equipo la convierte en un diseño listo para producir, sin costo y sin compromiso.
                </p>

                <ol className="space-y-3 mb-8">
                  {[
                    ["Contanos tu idea", "Mandanos tu frase, logo o una imagen de referencia."],
                    ["Recibí tu diseño", "Preparamos un mockup digital sin costo en menos de 24 h."],
                    ["Lo hacemos real", "Fabricamos y te lo enviamos listo para colgar y enchufar."]
                  ].map(([title, desc], i) => (
                    <li key={i} className="flex items-start gap-4 p-3.5 border border-white/10 bg-[#0a0a0f]/70 rounded-sm hover:border-cyan-400/40 transition-colors">
                      <span className="w-7 h-7 rounded-full border border-cyan-400 text-cyan-400 font-['Orbitron'] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <strong className="text-white font-['Orbitron'] text-xs tracking-wider block mb-0.5 uppercase">
                          {title}
                        </strong>
                        <p className="text-gray-400 text-xs sm:text-sm font-medium">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <Link to="/presupuesto" className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-white text-[#050508] font-bold font-['Orbitron'] px-6 py-3.5 rounded-sm text-xs tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                  <FaCommentAlt size={12} /> PEDIR PRESUPUESTO
                </Link>
              </div>
            </div>
          </section>

          <section className="py-16 px-4 md:px-8 max-w-[1200px] mx-auto text-center">
            <p className="text-cyan-400 font-['Orbitron'] text-[10px] sm:text-xs font-bold tracking-[0.2em] mb-2 uppercase">
              Comunidad NeonFlex
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Orbitron'] uppercase tracking-tight mb-8">
              Seguinos en <span className="text-cyan-400">@neonflexpremium</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {(portfolioPreview.length > 0 ? portfolioPreview : Array.from({ length: 6 })).map((item, idx) => (
                <a
                  key={item?.id || idx}
                  href={igLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative aspect-square bg-[#111117] border border-white/10 rounded-sm overflow-hidden hover:border-cyan-400 transition-colors"
                >
                  {item?.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title || `Instagram ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-purple-500/10 text-gray-500 font-['Orbitron'] text-[10px] p-2">
                      @neonflexpremium
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[#050508]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-cyan-400">
                    <FaInstagram size={24} />
                  </div>
                </a>
              ))}
            </div>

            <a
              href={igLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-cyan-400 hover:text-cyan-400 text-white font-bold font-['Orbitron'] px-6 py-3 rounded-sm text-xs tracking-widest uppercase transition-colors bg-[#111117]/80"
            >
              <FaInstagram size={14} /> VER EN INSTAGRAM
            </a>
          </section>


        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Escribinos por WhatsApp"
          className="fixed z-40 right-5 bottom-5 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#050508] flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-105 transition-all"
        >
          <FaWhatsapp size={28} />
        </a>

        {/* Modal de Detalle de Producto */}
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />

      </div>
    </>
  );
};

export default Home;