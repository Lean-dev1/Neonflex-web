import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom'; // IMPORTANTE: Agregamos Link aquí
import { FaWhatsapp, FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp, FaBolt } from 'react-icons/fa';

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('defecto'); 

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      const stock = res.data.filter(p => p.category !== 'portfolio');
      setProducts(stock);
      setFilteredProducts(stock);
    } catch (error) {
      console.error("Error cargando productos");
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  useEffect(() => {
    let result = [...products];
    if (searchTerm) {
      result = result.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (sortOrder === 'menor') {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOrder === 'mayor') {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    setFilteredProducts(result);
  }, [searchTerm, sortOrder, products]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white pt-24 pb-20 font-sans transition-colors duration-300">
      
      {/* --- ENCABEZADO --- */}
      <div className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 py-16 mb-12 transition-colors duration-300">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight uppercase">
              Catálogo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-600 dark:from-neon-blue dark:to-neon-red">Stock</span>
            </h1>
            <p className="text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg font-medium">
              Carteles listos para colgar. Elegí tu diseño favorito, compralo hoy y recibilo en cualquier parte del país.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-10">
        
        {/* --- BARRA LATERAL (FILTROS) --- */}
        <aside className="lg:w-1/4 space-y-6">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm transition-colors duration-300">
               <h3 className="font-black uppercase tracking-widest text-sm mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                 <FaSearch className="text-blue-600 dark:text-neon-blue"/> Buscar
               </h3>
               <div className="relative">
                 <input 
                   type="text" placeholder="Ej: Abierto, Cerveza..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full bg-gray-50 dark:bg-neutral-950 border border-gray-300 dark:border-neutral-700 rounded-lg py-3 pl-4 pr-10 text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-neon-blue outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-neutral-600"
                 />
                 <FaSearch className="absolute right-3 top-3.5 text-gray-400 dark:text-neutral-600" />
               </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm transition-colors duration-300">
               <h3 className="font-black uppercase tracking-widest text-sm mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                 <FaFilter className="text-red-600 dark:text-neon-red"/> Ordenar
               </h3>
               <div className="space-y-2">
                 <button onClick={() => setSortOrder('defecto')} className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between text-sm font-bold uppercase tracking-wider ${sortOrder === 'defecto' ? 'bg-gray-100 dark:bg-neutral-800 text-blue-600 dark:text-neon-blue' : 'text-gray-600 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-800'}`}>
                   Más Nuevos <FaBolt className={sortOrder === 'defecto' ? 'text-blue-600 dark:text-neon-blue' : 'text-gray-400'}/>
                 </button>
                 <button onClick={() => setSortOrder('menor')} className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between text-sm font-bold uppercase tracking-wider ${sortOrder === 'menor' ? 'bg-gray-100 dark:bg-neutral-800 text-blue-600 dark:text-neon-blue' : 'text-gray-600 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-800'}`}>
                   Menor Precio <FaSortAmountDown className={sortOrder === 'menor' ? 'text-blue-600 dark:text-neon-blue' : 'text-gray-400'}/>
                 </button>
                 <button onClick={() => setSortOrder('mayor')} className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between text-sm font-bold uppercase tracking-wider ${sortOrder === 'mayor' ? 'bg-gray-100 dark:bg-neutral-800 text-blue-600 dark:text-neon-blue' : 'text-gray-600 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-800'}`}>
                   Mayor Precio <FaSortAmountUp className={sortOrder === 'mayor' ? 'text-blue-600 dark:text-neon-blue' : 'text-gray-400'}/>
                 </button>
               </div>
            </div>
        </aside>

        {/* --- GRILLA DE PRODUCTOS --- */}
        <div className="lg:w-3/4">
           <div className="mb-6 flex justify-between items-end border-b border-gray-200 dark:border-neutral-800 pb-4">
              <p className="text-gray-500 dark:text-neutral-400 font-bold uppercase tracking-widest text-sm">Mostrando <span className="text-gray-900 dark:text-white">{filteredProducts.length}</span> carteles</p>
           </div>

           {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 border-dashed">
                <FaSearch className="text-5xl text-gray-300 dark:text-neutral-700 mx-auto mb-4" />
                <h3 className="text-xl font-black uppercase mb-2">No encontramos ese cartel</h3>
                <p className="text-gray-500 dark:text-neutral-500 text-sm">Intenta con otra palabra o pedí uno personalizado.</p>
              </div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredProducts.map((prod) => (
                 
                 /* Contenedor principal ahora es un LINK */
                 <Link 
                   to={`/producto/${prod.id}`}
                   key={prod.id} 
                   className="group flex flex-col bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-lg dark:hover:border-neon-blue/50 dark:hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300 cursor-pointer"
                 >
                   {/* 1. SECCIÓN IMAGEN */}
                   <div className="relative aspect-square w-full bg-black overflow-hidden border-b border-gray-100 dark:border-neutral-800">
                     <img 
                       src={prod.image_url} 
                       alt={prod.title} 
                       className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100" 
                     />
                     <div className="absolute top-3 left-3 bg-white dark:bg-neutral-950 text-gray-900 dark:text-white text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-widest z-10 shadow-md">
                        En Stock
                     </div>
                   </div>

                   {/* 2. SECCIÓN INFO */}
                   <div className="p-5 flex flex-col flex-grow justify-between">
                     <div>
                        <h3 className="text-lg font-black uppercase text-gray-900 dark:text-white line-clamp-1 mb-1 tracking-tight">{prod.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-neutral-400 line-clamp-2 mb-4 leading-relaxed">{prod.description}</p>
                     </div>
                     
                     <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100 dark:border-neutral-800">
                        <div>
                          <p className="text-[10px] text-gray-400 dark:text-neutral-500 uppercase font-bold tracking-widest mb-1">Precio</p>
                          <p className="text-2xl font-black text-blue-700 dark:text-neon-blue transition-colors duration-300">${prod.price}</p>
                        </div>
                        
                        {/* Botón WhatsApp */}
                        <button 
                          onClick={(e) => {
                             e.preventDefault();
                             window.open(`https://wa.me/5491164477337?text=Hola! Quiero comprar el cartel de stock: "${prod.title}" ($${prod.price}).`, '_blank');
                          }}
                          className="bg-green-600 hover:bg-green-500 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-md group-hover:rotate-12 group-hover:scale-110"
                          title="Comprar por WhatsApp"
                        >
                          <FaWhatsapp size={20} />
                        </button>
                     </div>
                   </div>
                 </Link>

               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Productos;