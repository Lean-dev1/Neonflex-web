import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp, FaBolt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CyberStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@700;900&display=swap');
    .prod-root { background: #050508; min-height: 100vh; color: white; font-family: 'Rajdhani', sans-serif; }
    
    .sidebar-panel {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 4px; padding: 20px;
    }
    .sidebar-heading { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(0,240,255,0.7); margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
    
    .search-input {
      width: 100%; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 2px; padding: 10px 36px 10px 12px; color: white; outline: none; transition: border-color 0.3s;
    }
    .search-input:focus { border-color: rgba(0,240,255,0.4); }
    
    .sort-btn {
      width: 100%; text-align: left; padding: 10px 14px; border-radius: 2px; border: 1px solid transparent;
      background: transparent; color: rgba(255,255,255,0.4); font-weight: 600; font-size: 12px;
      letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s;
      display: flex; align-items: center; justify-content: space-between;
    }
    .sort-btn:hover { background: rgba(255,255,255,0.03); color: rgba(255,255,255,0.7); }
    .sort-btn.active { background: rgba(0,240,255,0.06); border-color: rgba(0,240,255,0.25); color: #00f0ff; }
  `}</style>
);

const ProductCardItem = ({ prod }) => {
  const images = [prod.image_url, prod.image_url];
  const [currentImg, setCurrentImg] = useState(0);

  const nextImg = (e) => {
    e.preventDefault(); e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e) => {
    e.preventDefault(); e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
  };

  const precioEntero = Math.round(prod.price).toLocaleString('es-AR');

  return (
    // Tarjeta ligeramente rectangular (crece con el contenido) y bordes más rectos (rounded-sm)
    <Link to={`/producto/${prod.id}`} className="group flex flex-col bg-[#1a1a22] border border-white/5 rounded-sm overflow-hidden transition-all duration-300 hover:border-white/15 h-full">
      
      {/* La imagen mantiene su proporción cuadrada perfecta */}
      <div className="relative w-full aspect-square bg-black overflow-hidden border-b border-white/5">
        <img 
          src={images[currentImg]} 
          alt={prod.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />
        
        <div className="absolute top-2 left-2 bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest z-10">
          Stock
        </div>

        {images.length > 1 && (
          <>
            <button onClick={prevImg} className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/60 text-white w-6 h-6 flex items-center justify-center rounded-sm opacity-0 group-hover:opacity-100 hover:bg-cyan-500 transition-all z-20">
              <FaChevronLeft size={10} />
            </button>
            <button onClick={nextImg} className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/60 text-white w-6 h-6 flex items-center justify-center rounded-sm opacity-0 group-hover:opacity-100 hover:bg-cyan-500 transition-all z-20">
              <FaChevronRight size={10} />
            </button>
            
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
              {images.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-sm transition-colors ${i === currentImg ? 'bg-cyan-400' : 'bg-white/30'}`} />
              ))}
            </div>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a22] via-transparent to-transparent opacity-60 pointer-events-none" />
      </div>

      {/* Cuerpo de la tarjeta, empuja el contenido para rellenar la altura */}
      <div className="p-4 flex flex-col flex-grow bg-[#1a1a22] z-10">
        
        <h3 className="text-[13px] sm:text-[14px] font-bold uppercase text-white line-clamp-1 mb-3 tracking-widest transition-all duration-300 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
          {prod.title}
        </h3>
        
        <div className="flex items-center justify-between mt-auto">
          <p className="text-lg sm:text-xl font-black text-white font-['Orbitron'] tracking-tight">
            ${precioEntero}
          </p>
          
          <button 
            onClick={(e) => {
              e.preventDefault(); e.stopPropagation();
              window.open(`https://wa.me/5491164477337?text=Hola! Quiero comprar el cartel: "${prod.title}" ($${precioEntero}).`, '_blank');
            }}
            className="bg-[#2a2a35] hover:bg-green-500 text-green-400 hover:text-white w-8 h-8 sm:w-9 sm:h-9 rounded-sm flex items-center justify-center transition-all"
            title="Comprar por WhatsApp"
          >
            <FaWhatsapp size={14} />
          </button>
        </div>
      </div>
    </Link>
  );
};

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('defecto');
  const [filterCategory, setFilterCategory] = useState('todas');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/products');
        const stock = res.data.filter(p => p.category !== 'portfolio');
        setProducts(stock); 
      } catch (e) { console.error(e); }
    };
    fetch();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (filterCategory !== 'todas') {
      result = result.filter(p => {
        const cat = p.category?.toLowerCase() || '';
        const tit = p.title.toLowerCase();
        return cat.includes(filterCategory) || tit.includes(filterCategory);
      });
    }

    if (sortOrder === 'menor') result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    else if (sortOrder === 'mayor') result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    
    setFilteredProducts(result);
  }, [searchTerm, sortOrder, filterCategory, products]);

  return (
    <>
      <CyberStyles />
      <div className="prod-root pt-24 pb-20">
        
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col lg:flex-row gap-8">
          
          <aside className="w-full lg:w-56 flex-shrink-0 space-y-4">
              <div className="sidebar-panel">
                 <h3 className="sidebar-heading"><FaSearch size={12}/> Buscar</h3>
                 <div className="relative">
                   <input 
                     type="text" placeholder="Buscar..." 
                     value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                     className="search-input"
                   />
                 </div>
              </div>

              <div className="sidebar-panel">
                 <h3 className="sidebar-heading"><FaFilter size={12}/> Tipo</h3>
                 <div className="space-y-1">
                   {['todas', 'frase', 'figura'].map(cat => (
                     <button 
                       key={cat} onClick={() => setFilterCategory(cat)} 
                       className={`sort-btn ${filterCategory === cat ? 'active' : ''}`}
                     >
                       {cat === 'todas' ? 'Todos los diseños' : cat === 'frase' ? 'Frases / Textos' : 'Figuras / Dibujos'}
                     </button>
                   ))}
                 </div>
              </div>

              <div className="sidebar-panel">
                 <h3 className="sidebar-heading"><FaFilter size={12}/> Ordenar</h3>
                 <div className="space-y-1">
                   <button onClick={() => setSortOrder('defecto')} className={`sort-btn ${sortOrder === 'defecto' ? 'active' : ''}`}>
                     Más Nuevos <FaBolt size={12}/>
                   </button>
                   <button onClick={() => setSortOrder('menor')} className={`sort-btn ${sortOrder === 'menor' ? 'active' : ''}`}>
                     Menor Precio <FaSortAmountDown size={12}/>
                   </button>
                   <button onClick={() => setSortOrder('mayor')} className={`sort-btn ${sortOrder === 'mayor' ? 'active' : ''}`}>
                     Mayor Precio <FaSortAmountUp size={12}/>
                   </button>
                 </div>
              </div>
          </aside>

          <div className="flex-1">
             <div className="mb-4 flex justify-between items-center border-b border-white/10 pb-3">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                  Mostrando <span className="text-cyan-400">{filteredProducts.length}</span> carteles
                </p>
             </div>

             {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-lg border border-white/10 border-dashed">
                  <FaSearch className="text-3xl text-gray-600 mx-auto mb-4" />
                  <h3 className="text-base font-black uppercase text-white mb-2 tracking-widest">Sin resultados</h3>
                  <p className="text-gray-500 text-xs">Intenta con otra palabra o pedí uno personalizado.</p>
                </div>
             ) : (
               // GRID: Hasta 4 por fila en desktop para que sean ligeramente más grandes
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                 {filteredProducts.map((prod) => (
                   <ProductCardItem key={prod.id} prod={prod} />
                 ))}
               </div>
             )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Productos;