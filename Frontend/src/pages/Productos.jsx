import React, { useMemo, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from '../api/axios'; 
import bgLadrillos from '../assets/images/fondo.webp';

const categories = ["Todos", "Frases", "Figuras", "Negocios"];
const sortOptions = ["Novedades", "Menor precio", "Mayor precio"];
const waLink = "https://wa.me/5491164477337";


function Icon({ name, size = 18 }) {
  const paths = {
    arrow: <path d="M5 12h13M13 7l5 5-5 5" />,
    bag: (
      <>
        <path d="M6.5 8.5h11l1 11h-13l1-11Z" />
        <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
      </>
    ),
    bolt: <path d="m13.5 2-8 12h6l-1 8 8-12h-6l1-8Z" />,
    filter: <path d="M4 6h16M7 12h10M10 18h4" />,
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </>
    ),
    sort: <path d="M8 6h12M8 12h8M8 18h4M4 4v16" />,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}


function ProductCard({ product }) {
  const formattedPrice = Math.round(product.price).toLocaleString("es-AR");
  const message = encodeURIComponent(`Hola NeonFlexPremium, quiero comprar el cartel "${product.title}" por $${formattedPrice}.`);

  return (
    <article className="bg-[#111117] border border-white/5 hover:border-cyan-400/30 rounded-sm flex flex-col h-full group backdrop-blur-sm">
      
      <div className="relative aspect-square bg-black overflow-hidden border-b border-white/5">
        <img 
          src={product.image_url} 
          alt={product.title} 
          loading="lazy" 
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 group-hover:saturate-100 filter saturate-90 transition-transform duration-500 will-change-transform" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-2 left-2 bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-widest z-10 flex items-center gap-1 backdrop-blur-sm">
          <span className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></span> STOCK
        </div>
      </div>

      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-1.5">
          <span className="text-cyan-400/70">{product.category === 'carteleria' ? 'Catálogo' : product.category}</span>
          <span>COD-{product.id}</span>
        </div>
        
        <h2 className="text-white font-['Orbitron'] font-bold text-xs sm:text-sm tracking-wider uppercase mb-3 line-clamp-2">
          {product.title}
        </h2>
        
        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <div>
              <span className="block text-[8px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-0.5">Precio</span>
              <p className="text-white font-['Orbitron'] font-black text-base sm:text-lg">${formattedPrice}</p>
            </div>
            {product.medidas && (
              <span className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">{product.medidas}</span>
            )}
          </div>
          
          <a
            href={`${waLink}?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#050508] font-bold py-2 px-3 rounded-sm flex items-center justify-center gap-1.5 text-[10px] tracking-widest uppercase transition-colors mt-2"
          >
            <Icon name="bag" size={12} /> COMPRAR
          </a>
        </div>
      </div>
    </article>
  );
}


export default function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [sortOrder, setSortOrder] = useState("Novedades");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        const stockProducts = res.data.filter(p => p.category !== 'portfolio');
        setProducts(stockProducts);
      } catch (error) {
        console.error("Error cargando el catálogo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title?.toLowerCase().includes(search.trim().toLowerCase());
      const matchesCategory = category === "Todos" || product.category === category; 
      return matchesSearch && matchesCategory;
    });

    if (sortOrder === "Menor precio") return result.sort((a, b) => a.price - b.price);
    if (sortOrder === "Mayor precio") return result.sort((a, b) => b.price - a.price);
    if (sortOrder === "Novedades") return result.sort((a, b) => b.id - a.id);
    
    return result;
  }, [products, category, search, sortOrder]);

  return (
    <>
     <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Orbitron:wght@700;900&display=swap');
      `}</style>

      <div className="relative text-gray-300 font-['Rajdhani'] min-h-screen selection:bg-cyan-400 selection:text-black">
        
       
        <div 
          className="fixed inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat transform-gpu"
          style={{ backgroundImage: `url(${bgLadrillos})` }}
        >
          <div className="absolute inset-0 bg-[#050508]/90"></div>
          
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,240,255,0.06)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,0,0,0.06)_0%,transparent_70%)] pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 pt-24 pb-20">
          <section className="max-w-[1440px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
            
          
            <aside className="sticky top-28 hidden lg:flex flex-col gap-6">
              
              <div className="bg-[#0a0a0f]/90 backdrop-blur-md p-5 rounded-sm border border-white/5">
                <h3 className="text-white text-xs font-bold font-['Orbitron'] tracking-widest uppercase mb-4 flex items-center gap-2">
                  <Icon name="search" size={12} /> BÚSQUEDA
                </h3>
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Nombre del diseño..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full bg-[#1a1a22] border border-white/10 rounded-sm py-3 px-4 pl-10 text-white text-sm focus:border-cyan-400/50 outline-none transition-colors placeholder:text-gray-600"
                  />
                  <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
                     <Icon name="search" size={14} />
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a0f]/90 backdrop-blur-md p-5 rounded-sm border border-white/5">
                <h3 className="text-white text-xs font-bold font-['Orbitron'] tracking-widest uppercase mb-4 flex items-center gap-2">
                  <Icon name="filter" size={12} /> CATEGORÍAS
                </h3>
                <div className="flex flex-col gap-2">
                  {categories.map((item) => {
                    const count = item === "Todos" ? products.length : products.filter((p) => p.category === item).length;
                    const isActive = category === item;
                    return (
                      <button
                        key={item}
                        onClick={() => setCategory(item)}
                        className={`flex justify-between items-center py-2.5 px-3 rounded-sm text-xs tracking-widest font-bold uppercase transition-all ${isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-gray-400 hover:bg-white/5 border border-transparent'}`}
                      >
                        <span>{item === "Todos" ? "Catálogo Completo" : item}</span>
                        <b className={`font-['Orbitron'] opacity-60 ${isActive ? 'text-cyan-400' : ''}`}>{count}</b>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#0a0a0f]/90 backdrop-blur-md p-5 rounded-sm border border-white/5">
                <h3 className="text-white text-xs font-bold font-['Orbitron'] tracking-widest uppercase mb-4 flex items-center gap-2">
                  <Icon name="sort" size={12} /> ORDENAR POR
                </h3>
                <div className="flex flex-col gap-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortOrder(option)}
                      className={`flex justify-between items-center py-2.5 px-3 rounded-sm text-xs tracking-widest font-bold uppercase transition-all ${sortOrder === option ? 'text-white bg-white/5 border border-white/10' : 'text-gray-500 hover:text-gray-300 border border-transparent'}`}
                    >
                      <span>{option}</span>
                      {option === "Novedades" && sortOrder === option && <Icon name="bolt" size={12} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1a1a22] to-black p-6 rounded-sm border border-cyan-400/20 shadow-[0_0_15px_rgba(0,240,255,0.05)] text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff0a_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff0a_1px,transparent_1px)] bg-[size:14px_14px]"></div>
                
                <div className="relative z-10">
                  <span className="text-cyan-400 text-[9px] font-bold uppercase tracking-[0.25em] mb-2 block">CUSTOM LAB</span>
                  <h3 className="text-white font-['Orbitron'] text-sm font-bold uppercase tracking-wider mb-2">¿Querés tu propio logo?</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6">Cotizamos tu idea a medida, con diseño digital 3D sin cargo.</p>
                  
                  <Link to="/presupuesto" className="w-full inline-flex justify-center items-center gap-2 bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-2.5 rounded-sm text-[11px] tracking-widest uppercase transition-colors">
                    COTIZAR AHORA <Icon name="arrow" size={12} />
                  </Link>
                </div>
              </div>
            </aside>

           
            <div className="flex flex-col w-full">
              
              <div className="lg:hidden mb-6 flex flex-col gap-4">
                <input
                    type="search"
                    placeholder="Buscar diseño..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full bg-[#0a0a0f]/90 backdrop-blur-md border border-white/10 rounded-sm py-3 px-4 text-white text-sm focus:border-cyan-400/50 outline-none"
                  />
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                   {categories.map(item => (
                     <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap px-4 py-2 rounded-sm text-[11px] font-bold uppercase tracking-widest border ${category === item ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-[#0a0a0f]/90 backdrop-blur-md text-gray-400 border-white/5'}`}>
                       {item}
                     </button>
                   ))}
                </div>
              </div>

              <div className="flex justify-between items-center bg-[#0a0a0f]/90 backdrop-blur-md border border-white/5 rounded-sm p-4 mb-6">
                <p className="text-xs text-gray-400 tracking-widest uppercase font-bold">
                  MOSTRANDO <b className="text-white">{filteredProducts.length}</b> {filteredProducts.length === 1 ? "DISEÑO" : "DISEÑOS"}
                </p>
                <span className="hidden sm:inline-block text-cyan-400 font-['Orbitron'] text-[10px] tracking-[0.2em] font-bold bg-cyan-500/10 px-3 py-1 rounded-sm border border-cyan-400/20">
                  STOCK EN TIEMPO REAL
                </span>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-[50vh]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center bg-[#0a0a0f]/90 backdrop-blur-md border border-white/5 rounded-sm p-16 text-center h-[50vh]">
                  <div className="text-gray-600 mb-6 opacity-50"><Icon name="search" size={48} /></div>
                  <h2 className="text-white font-['Orbitron'] text-xl font-bold uppercase tracking-wider mb-2">Sin Resultados</h2>
                  <p className="text-gray-500 text-sm mb-8">No encontramos carteles que coincidan con tu búsqueda actual.</p>
                  <button
                    type="button"
                    onClick={() => { setSearch(""); setCategory("Todos"); }}
                    className="border border-white/20 hover:border-cyan-400 hover:text-cyan-400 text-white font-bold px-6 py-3 rounded-sm transition-all text-xs tracking-widest uppercase"
                  >
                    VER CATÁLOGO COMPLETO
                  </button>
                </div>
              )}

            </div>
          </section>
        </div>
      </div>
    </>
  );
}