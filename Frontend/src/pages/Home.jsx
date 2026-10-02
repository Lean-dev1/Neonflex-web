import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaChevronRight, FaArrowRight, FaBars, FaTimes, FaShoppingBag, FaCommentAlt } from 'react-icons/fa';

// Imágenes de ejemplo o las que prefieras usar
import imgAbasta from '../assets/images/abasta.png';
import imgCabrona from '../assets/images/cabrona.png';
import imgBurger from '../assets/images/hamburguesa.png';
import imgLumi from '../assets/images/lumi.png';

const heroFeatures = [
  {
    name: "Custom Type",
    spec: "Diseño a medida · Cian",
    image: imgLumi,
  },
  {
    name: "Better Way",
    spec: "Serie Signature · Cálido",
    image: imgAbasta,
  },
  {
    name: "Good Vibes",
    spec: "Serie Studio · Rosa",
    image: imgCabrona,
  },
];

const productsMock = [
  {
    name: "Create Your Own",
    detail: "Diseño 100% personalizado",
    price: "Desde $89.900",
    tag: "MÁS ELEGIDO",
    image: imgCabrona,
  },
  {
    name: "Better Way",
    detail: "Cálido · 60 × 28 cm",
    price: "$112.500",
    tag: "NUEVO",
    image: imgBurger,
  },
  {
    name: "Good Vibes Only",
    detail: "Rosa · 50 × 50 cm",
    price: "$129.900",
    image: imgLumi,
  },
];

const waLink = "https://wa.me/5491164477337?text=Hola%20NeonFlexPremium%2C%20quiero%20cotizar%20mi%20cartel";

const Home = () => {
  const [activeHero, setActiveHero] = useState(0);
  const [activeFilter, setActiveFilter] = useState("Todos");

  return (
    <div className="bg-[#050508] text-gray-300 font-['Rajdhani'] min-h-screen selection:bg-cyan-400 selection:text-black">
      
      {/* ========================================= */}
      {/* 1. HERO INMERSIVO Y ORIGINAL              */}
      {/* ========================================= */}
      <section className="relative min-h-[80vh] flex items-center pt-28 pb-16 px-4 md:px-12 max-w-[1380px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] items-center gap-12 w-full">
          
          {/* Columna Izquierda: Copy y CTAs */}
          <div>
            <div className="inline-flex items-center gap-3 mb-6 text-cyan-400 font-['Orbitron'] text-xs font-semibold tracking-[0.19em]">
              <span className="w-7 h-[1px] bg-cyan-400"></span> FABRICACIÓN NACIONAL DE ALTA GAMA
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-['Orbitron'] uppercase tracking-tight leading-[1.02] mb-6">
              Luz que define<br />
              <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">tu espacio.</span>
            </h1>

            <p className="max-w-[520px] text-gray-400 text-lg sm:text-xl leading-relaxed mb-8 font-medium">
              Creamos piezas de luz personalizadas que convierten cualquier ambiente en una experiencia inolvidable.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/presupuesto" className="bg-cyan-400 hover:bg-white text-black font-bold px-7 py-3.5 rounded-sm transition-all text-xs tracking-widest uppercase flex items-center gap-3 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                COTIZAR MI DISEÑO <FaArrowRight size={12} />
              </Link>
              <Link to="/productos" className="border border-white/20 hover:border-cyan-400 hover:text-cyan-400 text-white font-bold px-7 py-3.5 rounded-sm transition-all text-xs tracking-widest uppercase">
                EXPLORAR CATÁLOGO
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-[570px] pt-6 border-t border-white/10">
              <div>
                <strong className="text-white font-['Orbitron'] text-lg font-bold block">+500</strong>
                <span className="text-[#737681] font-['Orbitron'] text-[9px] tracking-wider">PROYECTOS REALIZADOS</span>
              </div>
              <div className="pl-4 border-l border-white/10">
                <strong className="text-white font-['Orbitron'] text-lg font-bold block">100%</strong>
                <span className="text-[#737681] font-['Orbitron'] text-[9px] tracking-wider">DISEÑO A MEDIDA</span>
              </div>
              <div className="pl-4 border-l border-white/10">
                <strong className="text-white font-['Orbitron'] text-lg font-bold block">24H</strong>
                <span className="text-[#737681] font-['Orbitron'] text-[9px] tracking-wider">PROPUESTA VISUAL</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Showcase Interactivo */}
          <div className="relative bg-[#0a0a0f] border border-white/10 p-4 shadow-2xl">
            <div className="flex justify-between items-center text-[9px] font-['Orbitron'] tracking-widest text-gray-500 mb-2 px-1">
              <span>FEATURED / 0{activeHero + 1}</span>
              <span className="text-cyan-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span> LIVE</span>
            </div>

            <div className="relative h-[400px] sm:h-[450px] bg-black overflow-hidden mb-3 border border-white/5">
              <img src={heroFeatures[activeHero].image} alt="Showcase Neón" className="w-full h-full object-cover filter saturate-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="absolute left-6 bottom-6 border-l-2 border-cyan-400 pl-3">
                <small className="text-gray-400 text-xs tracking-widest uppercase block mb-1">{heroFeatures[activeHero].spec}</small>
                <strong className="text-white font-['Orbitron'] text-base tracking-wider uppercase">{heroFeatures[activeHero].name}</strong>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {heroFeatures.map((feat, idx) => (
                <button 
                  key={feat.name}
                  onClick={() => setActiveHero(idx)}
                  className={`flex items-center gap-2 p-1.5 border text-left transition-all ${activeHero === idx ? 'border-cyan-400 bg-white/5' : 'border-white/10 bg-[#0d0d13] opacity-60 hover:opacity-100'}`}
                >
                  <img src={feat.image} alt="" className="w-10 h-8 object-cover" />
                  <span className="text-[9px] font-['Orbitron'] tracking-wider overflow-hidden">
                    <span className="text-cyan-400 block">0{idx + 1}</span>
                    <span className="text-white truncate block">{feat.name}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================= */}
      {/* 2. CATÁLOGO / DESTACADOS                  */}
      {/* ========================================= */}
      <section className="py-20 px-4 md:px-12 max-w-[1380px] mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <p className="text-cyan-400 font-['Orbitron'] text-xs font-semibold tracking-[0.2em] mb-2 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-cyan-400"></span> CATÁLOGO DESTACADO
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-['Orbitron'] uppercase tracking-tight">
              Elegí tu <span className="text-cyan-400">neón</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm">Modelos listos para transformar tu espacio. ¿Tenés otra idea? La hacemos realidad.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsMock.map((prod, index) => (
            <div key={prod.name} className="bg-[#111117] border border-white/10 rounded-sm overflow-hidden group hover:border-cyan-400/50 transition-all">
              <div className="relative aspect-square bg-black overflow-hidden">
                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {prod.tag && (
                  <span className="absolute top-3 left-3 bg-cyan-400 text-black text-[9px] font-bold font-['Orbitron'] px-2 py-1 tracking-widest">
                    {prod.tag}
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-1">{prod.detail}</p>
                <h3 className="text-white font-['Orbitron'] font-bold text-base tracking-wide uppercase group-hover:text-cyan-400 transition-colors">
                  {prod.name}
                </h3>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                  <span className="text-white font-['Orbitron'] font-black text-lg">{prod.price}</span>
                  <div className="flex gap-2">
                    <a href={`${waLink}%20${encodeURIComponent(prod.name)}`} target="_blank" rel="noreferrer" className="bg-cyan-400 text-black px-3 py-2 text-[10px] font-bold font-['Orbitron'] tracking-wider flex items-center gap-1.5 hover:bg-white transition-colors">
                      <FaShoppingBag size={12} /> COMPRAR
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/productos" className="inline-flex items-center gap-3 text-white font-bold font-['Orbitron'] text-xs tracking-widest border-b border-cyan-400 pb-1 hover:text-cyan-400 transition-colors">
            VER TODOS LOS PRODUCTOS <FaArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* ========================================= */}
      {/* 3. SECCIÓN PERSONALIZADOS / PRESUPUESTO   */}
      {/* ========================================= */}
      <section className="bg-[#111117] border-y border-white/10 py-20 px-4 md:px-12">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative aspect-[4/3] bg-black border border-white/10 overflow-hidden">
            <img src={imgLumi} alt="Custom Neon" className="w-full h-full object-cover filter contrast-110" />
            <div className="absolute bottom-0 right-0 bg-cyan-400 text-black px-4 py-2 font-['Orbitron'] font-black text-xs tracking-widest">
              Nº 500+ PROYECTOS
            </div>
          </div>

          <div>
            <p className="text-cyan-400 font-['Orbitron'] text-xs font-semibold tracking-[0.2em] mb-2">TU DISEÑO. NUESTRA TÉCNICA.</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Orbitron'] uppercase tracking-tight mb-6">
              ¿Tenés una idea?<br /><span className="text-cyan-400">Hagámosla brillar.</span>
            </h2>
            <p className="text-gray-400 text-base mb-8 leading-relaxed">
              Nos mandás tu frase, logo o referencia. Nuestro equipo la convierte en un diseño listo para producir, sin costo y sin compromiso.
            </p>

            <ol className="space-y-4 mb-8">
              <li className="flex items-start gap-4 p-3 border border-white/5 bg-black/40">
                <span className="text-cyan-400 font-['Orbitron'] font-black text-sm">01</span>
                <div>
                  <b className="text-white font-['Orbitron'] text-xs tracking-wider block mb-0.5">CONTANOS TU IDEA</b>
                  <small className="text-gray-400 text-xs">Compartí texto, tamaño y color por WhatsApp.</small>
                </div>
              </li>
              <li className="flex items-start gap-4 p-3 border border-white/5 bg-black/40">
                <span className="text-cyan-400 font-['Orbitron'] font-black text-sm">02</span>
                <div>
                  <b className="text-white font-['Orbitron'] text-xs tracking-wider block mb-0.5">RECIBÍ TU DISEÑO</b>
                  <small className="text-gray-400 text-xs">Te enviamos un mockup digital en menos de 24 h.</small>
                </div>
              </li>
              <li className="flex items-start gap-4 p-3 border border-white/5 bg-black/40">
                <span className="text-cyan-400 font-['Orbitron'] font-black text-sm">03</span>
                <div>
                  <b className="text-white font-['Orbitron'] text-xs tracking-wider block mb-0.5">LO HACEMOS REAL</b>
                  <small className="text-gray-400 text-xs">Producimos y enviamos tu cartel listo para instalar.</small>
                </div>
              </li>
            </ol>

            <a href={waLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-cyan-400 hover:bg-white text-black font-bold px-8 py-4 rounded-sm text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <FaWhatsapp size={16} /> PEDIR PRESUPUESTO
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;